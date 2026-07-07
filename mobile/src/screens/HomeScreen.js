import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
  TouchableOpacity, ActivityIndicator, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { getPrograms, getDonations, getVolunteers } from '../services/api';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    programsCount: 0,
    donationsTotal: 0,
    volunteersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [progRes, donRes, volRes] = await Promise.all([
        getPrograms(),
        getDonations(),
        getVolunteers(),
      ]);

      const totalDonations = donRes.data.reduce((sum, item) => {
        if (item.payment_status === 'success') {
          return sum + parseFloat(item.amount);
        }
        return sum;
      }, 0);

      setStats({
        programsCount: progRes.data.length,
        donationsTotal: totalDonations,
        volunteersCount: volRes.data.length,
      });
    } catch (err) {
      console.log('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.username}>
              {user ? `${user.first_name || user.username}` : 'Guest User'}
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Highlight balance card */}
        <View style={styles.cardHighlight}>
          <Text style={styles.highlightLabel}>Total Donations Raised</Text>
          <Text style={styles.highlightValue}>
            ₦{stats.donationsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />}
      >
        <Text style={styles.sectionTitle}>Overview Stats</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(108, 99, 255, 0.1)' }]}>
              <Ionicons name="apps-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>{stats.programsCount}</Text>
            <Text style={styles.statLabel}>Active Programs</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(0, 212, 170, 0.1)' }]}>
              <Ionicons name="people-outline" size={24} color={COLORS.accent} />
            </View>
            <Text style={styles.statValue}>{stats.volunteersCount}</Text>
            <Text style={styles.statLabel}>Registered Volunteers</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Programs')}>
            <LinearGradient colors={['#2E2A4B', '#1E1B3A']} style={styles.actionGradient}>
              <Ionicons name="heart-half-outline" size={28} color={COLORS.primaryLight} />
              <Text style={styles.actionText}>Programs & Campaigns</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Donations')}>
            <LinearGradient colors={['#2E2A4B', '#1E1B3A']} style={styles.actionGradient}>
              <Ionicons name="cash-outline" size={28} color={COLORS.accent} />
              <Text style={styles.actionText}>Record Donation</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Volunteers')}>
            <LinearGradient colors={['#2E2A4B', '#1E1B3A']} style={styles.actionGradient}>
              <Ionicons name="shirt-outline" size={28} color="#FFB347" />
              <Text style={styles.actionText}>Volunteer Signup</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('News')}>
            <LinearGradient colors={['#2E2A4B', '#1E1B3A']} style={styles.actionGradient}>
              <Ionicons name="newspaper-outline" size={28} color="#63B3ED" />
              <Text style={styles.actionText}>Latest NGO News</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: FONTS.sizes.md,
  },
  username: {
    color: '#FFF',
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  cardHighlight: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  highlightLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FONTS.sizes.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  highlightValue: {
    color: '#FFF',
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    marginTop: SPACING.xs,
  },
  scrollContainer: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: (width - 48) / 2,
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: (width - 48) / 2,
    height: 120,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
  },
  actionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
});
