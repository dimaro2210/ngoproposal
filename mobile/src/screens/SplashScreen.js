import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.5)).current;
  const ringOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Ring pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ringScale, { toValue: 1.5, duration: 1200, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(ringScale, { toValue: 0.5, duration: 0, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.6, duration: 0, useNativeDriver: true }),
        ]),
      ])
    ).start();

    // Logo entrance
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.delay(300),
      Animated.timing(textOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    // Navigate after animation
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#0F0E17', '#1A1928', '#252438']} style={styles.container}>
      {/* Pulsing ring */}
      <Animated.View
        style={[styles.ring, { transform: [{ scale: ringScale }], opacity: ringOpacity }]}
      />

      {/* Logo */}
      <Animated.View style={[styles.logoBox, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.logoGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.logoIcon}>🌍</Text>
        </LinearGradient>
      </Animated.View>

      {/* App name */}
      <Animated.View style={{ opacity: textOpacity, alignItems: 'center' }}>
        <Text style={styles.appName}>NGO Connect</Text>
        <Text style={styles.tagline}>Empowering Communities</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  logoBox: {
    marginBottom: SPACING.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 20,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 48,
  },
  appName: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: FONTS.sizes.md,
    color: COLORS.accent,
    marginTop: SPACING.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
