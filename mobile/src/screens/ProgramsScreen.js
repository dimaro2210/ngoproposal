import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image,
  TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';
import { getPrograms } from '../services/api';

export default function ProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProgramsList = async () => {
    try {
      const res = await getPrograms();
      setPrograms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProgramsList();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgramsList();
  };

  const renderProgramCard = ({ item }) => {
    const target = parseFloat(item.target_amount) || 1;
    const current = parseFloat(item.current_amount) || 0;
    const progress = Math.min(current / target, 1);
    const progressPercent = Math.round(progress * 100);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProgramDetail', { programId: item.id })}
      >
        <Image
          source={{ uri: item.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600' }}
          style={styles.cardImage}
        />
        <View style={styles.cardBadge}>
          <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Progress Section */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Campaign Goal</Text>
              <Text style={styles.progressValue}>{progressPercent}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountRaised}>
                ₦{current.toLocaleString()} <Text style={styles.amountLabel}>raised</Text>
              </Text>
              <Text style={styles.amountTarget}>
                of ₦{target.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={programs}
        renderItem={renderProgramCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="gift-outline" size={60} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No Campaigns Found</Text>
            <Text style={styles.emptySubtitle}>There are currently no active donation campaigns.</Text>
          </View>
        }
      />
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
  listContainer: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  cardBody: {
    padding: SPACING.md,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    marginTop: SPACING.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  progressValue: {
    color: COLORS.accent,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  amountRaised: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  amountLabel: {
    color: COLORS.textMuted,
    fontWeight: '400',
    fontSize: FONTS.sizes.xs,
  },
  amountTarget: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
});
