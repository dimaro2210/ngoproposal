import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Animated,
  TouchableOpacity, Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: '🌍',
    title: 'Make a Real Impact',
    subtitle: 'Connect with NGO programs that transform lives across Nigeria and beyond.',
    gradient: [COLORS.primary, COLORS.primaryDark],
  },
  {
    id: '2',
    icon: '💚',
    title: 'Donate with Ease',
    subtitle: 'Give to causes you care about securely and track your donation history in real time.',
    gradient: [COLORS.accent, COLORS.accentDark],
  },
  {
    id: '3',
    icon: '🤝',
    title: 'Volunteer & Grow',
    subtitle: 'Join a community of passionate volunteers and make every weekend count.',
    gradient: ['#9B59B6', '#6C3483'],
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <LinearGradient
        colors={[COLORS.background, COLORS.surface]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.iconWrapper}>
        <LinearGradient colors={item.gradient} style={styles.iconCircle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.icon}>{item.icon}</Text>
        </LinearGradient>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onMomentumScrollEnd={(e) => {
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({ inputRange, outputRange: [8, 24, 8], extrapolate: 'clamp' });
          const opacity = scrollX.interpolate({ inputRange, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            style={styles.nextGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next →'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: 80,
  },
  iconWrapper: { marginBottom: SPACING.xl },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  icon: { fontSize: 64 },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  skipBtn: { padding: SPACING.md },
  skipText: { color: COLORS.textMuted, fontSize: FONTS.sizes.md },
  nextBtn: {
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  nextGradient: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
  },
  nextText: { color: '#fff', fontSize: FONTS.sizes.md, fontWeight: '700' },
});
