import React, { useState } from 'react';

export default function TeamStack({ members }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [mouseOffsets, setMouseOffsets] = useState({ x: 0, rotate: 0 });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;
    const offset = x - half;
    const percent = offset / half; // Normalized value between -1 and 1

    setMouseOffsets({
      x: percent * 30, // shift up to 30px
      rotate: percent * 25, // rotate up to 25 degrees
    });
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setMouseOffsets({ x: 0, rotate: 0 });
  };

  if (!members || members.length === 0) return null;

  return (
    <div className="team-avatar-stack">
      {members.map((member, index) => {
        const isHovered = hoveredId === index;

        return (
          <div
            key={index}
            className="team-avatar-item"
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e, index)}
            style={{
              zIndex: isHovered ? 50 : 10 + index,
            }}
          >
            {/* Tooltip */}
            <div
              className={`team-tooltip ${isHovered ? 'visible' : ''}`}
              style={{
                transform: isHovered
                  ? `translateX(calc(-50% + ${mouseOffsets.x}px)) rotate(${mouseOffsets.rotate}deg) scale(1)`
                  : 'translateX(-50%) rotate(0deg) scale(0.9)',
              }}
            >
              <div className="tooltip-inner">
                {/* Gradient underline decorations */}
                <div className="tooltip-line primary"></div>
                <div className="tooltip-line secondary"></div>
                <span className="tooltip-name">{member.name}</span>
                <span className="tooltip-role">{member.role}</span>
                {member.bio && <span className="tooltip-bio">{member.bio}</span>}
              </div>
            </div>

            {/* Avatar Image */}
            <img
              src={member.image}
              alt={member.name}
              className="team-avatar-img"
            />
          </div>
        );
      })}
    </div>
  );
}
