import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';
import { getProgramById } from '../services/api';

export default function ProgramDetailScreen({ route, navigation }) {
  const { programId } = route.params;
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgram();
  }, [programId]);

  const fetchProgram = async () => {
    try {
      const res = await getProgramById(programId);
      setProgram(res.data);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to retrieve campaign details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!program) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Campaign not found.</Text>
      </View>
    );
  }

  const target = parseFloat(program.target_amount) || 1;
  const current = parseFloat(program.current_amount) || 0;
  const progress = Math.min(current / target, 1);
  const progressPercent = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: program.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600' }}
          style={styles.image}
        />

        <View style={styles.body}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{program.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.dateText}>Created recently</Text>
          </View>

          <Text style={styles.title}>{program.title}</Text>

          {/* Progress Box */}
          <View style={styles.statsCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.raisedLabel}>Raised Amount</Text>
              <Text style={styles.percentText}>{progressPercent}%</Text>
            </View>
            <Text style={styles.raisedValue}>
              ₦{current.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>

            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>

            <View style={styles.targetRow}>
              <Text style={styles.targetLabel}>Campaign Target:</Text>
              <Text style={styles.targetValue}>
                ₦{target.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          {/* Description Section */}
          <Text style={styles.sectionTitle}>About this Campaign</Text>
          <Text style={styles.description}>{program.description}</Text>

          {/* Info cards */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.accent} />
              <Text style={styles.infoText}>100% Secure Transaction via Paystack</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="gift-outline" size={20} color={COLORS.accent} />
              <Text style={styles.infoText}>Direct Impact: Funds go directly to program operational expenses</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Donation Button */}
      <View style={styles.footerBtnContainer}>
        <TouchableOpacity
          style={styles.donateBtn}
          onPress={() => navigation.navigate('Donations', { programId: program.id })}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            style={styles.btnGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="heart" size={22} color="#FFF" style={styles.heartIcon} />
            <Text style={styles.donateBtnText}>Support Campaign</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  body: {
    padding: SPACING.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  badge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: COLORS.textInverse,
    fontWeight: '700',
    fontSize: FONTS.sizes.xs,
  },
  dateText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    marginBottom: SPACING.md,
    lineHeight: 30,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderColor: COLORS.border,
    borderWidth: 1,
    marginBottom: SPACING.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  raisedLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textTransform: 'uppercase',
  },
  percentText: {
    color: COLORS.accent,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  raisedValue: {
    color: '#FFF',
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    marginVertical: SPACING.xs,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: SPACING.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 5,
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  targetLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },
  targetValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  infoBox: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 40,
    fontSize: FONTS.sizes.lg,
  },
  footerBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  donateBtn: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  heartIcon: {
    marginRight: SPACING.sm,
  },
  donateBtnText: {
    color: '#FFF',
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
});
