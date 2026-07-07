import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';
import { registerVolunteer } from '../services/api';

export default function VolunteersScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [interestAreas, setInterestAreas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !experience || !interestAreas) {
      Alert.alert('Validation Error', 'Please fill in all field boxes.');
      return;
    }

    setLoading(true);
    try {
      await registerVolunteer({
        full_name: fullName,
        email: email,
        phone: phone,
        experience: experience,
        interest_areas: interestAreas,
      });

      Alert.alert('Success', 'Thank you for registering as a volunteer! We will reach out shortly.', [
        {
          text: 'OK',
          onPress: () => {
            setFullName('');
            setEmail('');
            setPhone('');
            setExperience('');
            setInterestAreas('');
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Unable to complete volunteer registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Join Our Mission</Text>
          <Text style={styles.subtitle}>Volunteer your time and skills to build a better future together.</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.textMuted}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={COLORS.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. +234..."
            placeholderTextColor={COLORS.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Areas of Interest</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. Education, Health, Field work, Fundraising"
            placeholderTextColor={COLORS.textMuted}
            value={interestAreas}
            onChangeText={setInterestAreas}
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Experience / Why do you want to join?</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Briefly describe your experience or motivation"
            placeholderTextColor={COLORS.textMuted}
            value={experience}
            onChangeText={setExperience}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitText}>Submit Application</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingTop: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 40,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    color: COLORS.textPrimary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    textAlignVertical: 'top',
    height: 80,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  submitText: {
    color: '#FFF',
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});
