import React from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';

const newsData = [
  {
    id: '1',
    title: 'Supporting Rural Education in Kano State',
    summary: 'Our volunteer team successfully delivered over 500 educational learning kits to local schools in remote communities.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
    date: 'July 5, 2026',
    category: 'Education',
  },
  {
    id: '2',
    title: 'Clean Water Project Launches in Enugu rural communities',
    summary: 'Three new solar-powered boreholes have been successfully commissioned, providing access to clean drinking water for over 2,000 residents.',
    image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=600',
    date: 'June 28, 2026',
    category: 'Water & Health',
  },
  {
    id: '3',
    title: 'Volunteer Summit 2026: Register Today',
    summary: 'Connect with hundreds of passionate youths across Nigeria to align on the United Nations Sustainable Development Goals (SDGs).',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600',
    date: 'June 15, 2026',
    category: 'Summit',
  },
];

export default function NewsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>

        <TouchableOpacity
          style={styles.readMore}
          onPress={() => Linking.openURL('https://github.com/dimaro2210/ngoproposal')}
        >
          <Text style={styles.readMoreText}>Read Full Article</Text>
          <Ionicons name="arrow-forward-outline" size={16} color={COLORS.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
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
  image: {
    width: '100%',
    height: 180,
  },
  badge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: '#FFF',
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  body: {
    padding: SPACING.md,
  },
  date: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginBottom: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  summary: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
    marginRight: 4,
  },
});
