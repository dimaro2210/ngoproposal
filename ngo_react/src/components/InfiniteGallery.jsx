import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

// ── Cloth shader material factory ──────────────────────────────────────────────
function createClothMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map:         { value: null },
      opacity:     { value: 1.0 },
      blurAmount:  { value: 0.0 },
      scrollForce: { value: 0.0 },
      time:        { value: 0.0 },
      isHovered:   { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float curveIntensity = scrollForce * 0.3;
        float distFromCenter = length(pos.xy);
        float curve = distFromCenter * distFromCenter * curveIntensity;

        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;

        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = sin(wavePhase) * 0.1 * dampening;
          flagWave += sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
        }

        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(map, vUv);

        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }

        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
}

// ── Single image plane ─────────────────────────────────────────────────────────
function ImagePlane({ texture, position, scale, material }) {
  const meshRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material && texture) material.uniforms.map.value = texture;
  }, [material, texture]);

  useEffect(() => {
    if (material?.uniforms) material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
  }, [material, isHovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

// ── 3-D scene ──────────────────────────────────────────────────────────────────
function GalleryScene({
  images,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn:  { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn:  { start: 0.0,  end: 0.1  },
    blurOut: { start: 0.9,  end: 1.0  },
    maxBlur: 3.0,
  },
}) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const lastInteraction = useRef(Date.now());

  const normalizedImages = useMemo(
    () => images.map(img => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );

  const textures = useTexture(normalizedImages.map(img => img.src));

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount]
  );

  const spatialPositions = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const hAngle = (i * 2.618) % (Math.PI * 2);
      const vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const hRadius = (i % 3) * 1.2;
      const vRadius = ((i + 1) % 4) * 0.8;
      return {
        x: (Math.sin(hAngle) * hRadius * MAX_HORIZONTAL_OFFSET) / 3,
        y: (Math.cos(vAngle) * vRadius * MAX_VERTICAL_OFFSET) / 4,
      };
    });
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange  = DEFAULT_DEPTH_RANGE;

  const planesData = useRef(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }))
  );

  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, visibleCount]);

  const lastScrollY = useRef(window.scrollY);

  const handleWheel = useCallback((e) => {
    setScrollVelocity(prev => prev + e.deltaY * 0.01 * speed);
    setAutoPlay(false);
    lastInteraction.current = Date.now();
  }, [speed]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      setScrollVelocity(prev => prev - 2 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      setScrollVelocity(prev => prev + 2 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    }
  }, [speed]);

  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Add page scroll delta to the 3D flyout velocity
      setScrollVelocity(prev => prev + delta * 0.05 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: true });
    }
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWheel, handleKeyDown, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) setAutoPlay(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (autoPlay) setScrollVelocity(prev => prev + 0.3 * delta);
    setScrollVelocity(prev => prev * 0.95);

    const time = state.clock.getElapsedTime();
    materials.forEach(mat => {
      if (mat?.uniforms) {
        mat.uniforms.time.value = time;
        mat.uniforms.scrollForce.value = scrollVelocity;
      }
    });

    const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const halfRange = depthRange / 2;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 10;
      let wrapsForward = 0, wrapsBackward = 0;

      if (newZ >= depthRange) {
        wrapsForward = Math.floor(newZ / depthRange);
        newZ -= depthRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / depthRange);
        newZ += depthRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0)
        plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % depthRange) + depthRange) % depthRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      const normalizedPos = plane.z / depthRange;

      // Opacity
      let opacity = 1;
      if (normalizedPos < fadeSettings.fadeIn.start) {
        opacity = 0;
      } else if (normalizedPos <= fadeSettings.fadeIn.end) {
        opacity = (normalizedPos - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
      } else if (normalizedPos >= fadeSettings.fadeOut.end) {
        opacity = 0;
      } else if (normalizedPos >= fadeSettings.fadeOut.start) {
        opacity = 1 - (normalizedPos - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // Blur
      let blur = 0;
      if (normalizedPos < blurSettings.blurIn.start) {
        blur = blurSettings.maxBlur;
      } else if (normalizedPos <= blurSettings.blurIn.end) {
        blur = blurSettings.maxBlur * (1 - (normalizedPos - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
      } else if (normalizedPos > blurSettings.blurOut.end) {
        blur = blurSettings.maxBlur;
      } else if (normalizedPos >= blurSettings.blurOut.start) {
        blur = blurSettings.maxBlur * ((normalizedPos - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));
      }
      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      const mat = materials[i];
      if (mat?.uniforms) {
        mat.uniforms.opacity.value = opacity;
        mat.uniforms.blurAmount.value = blur;
      }
    });
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture  = textures[plane.imageIndex];
        const material = materials[i];
        if (!texture || !material) return null;

        const worldZ = plane.z - depthRange / 2;
        const aspect = texture.image ? texture.image.width / texture.image.height : 1;
        const scale  = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];

        return (
          <ImagePlane
            key={plane.index}
            texture={texture}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={material}
          />
        );
      })}
    </>
  );
}

// ── Fallback (no WebGL) ────────────────────────────────────────────────────────
function FallbackGallery({ images }) {
  const normalized = useMemo(
    () => images.map(img => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', background:'#1B2B26', padding:'2rem' }}>
      <p style={{ color:'rgba(255,255,255,.6)', marginBottom:'1rem' }}>WebGL not supported. Showing images:</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:'1rem', width:'100%', maxHeight:'360px', overflowY:'auto' }}>
        {normalized.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} style={{ width:'100%', height:'100px', objectFit:'cover', borderRadius:'8px' }} />
        ))}
      </div>
    </div>
  );
}

// ── Public export ──────────────────────────────────────────────────────────────
export default function InfiniteGallery({
  images,
  style,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn:  { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4,  end: 0.43 },
  },
  blurSettings = {
    blurIn:  { start: 0.0, end: 0.1  },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
}) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch { setWebglSupported(false); }
  }, []);

  const containerStyle = {
    width: '100%',
    height: '70vh',
    minHeight: '480px',
    position: 'relative',
    overflow: 'hidden',
    background: '#0D1B18',
    ...style,
  };

  if (!webglSupported) {
    return (
      <div style={containerStyle}>
        <FallbackGallery images={images} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GalleryScene
          images={images}
          speed={speed}
          visibleCount={visibleCount}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
        />
      </Canvas>
    </div>
  );
}
