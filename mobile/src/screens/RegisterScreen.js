import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';
import { registerUser } from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !password2) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    if (password !== password2) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        username,
        email,
        password,
        password2,
        first_name: firstName,
        last_name: lastName,
      });
      Alert.alert('Success', 'Registration completed successfully! Please log in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (err) {
      console.log(err);
      let errorMsg = 'An error occurred during registration.';
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'object') {
          errorMsg = Object.values(data).flat().join('\n');
        } else {
          errorMsg = data;
        }
      }
      Alert.alert('Registration Failed', errorMsg);
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
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and help make a difference today</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username *</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            placeholderTextColor={COLORS.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First"
                placeholderTextColor={COLORS.textMuted}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last"
                placeholderTextColor={COLORS.textMuted}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 8 characters"
            placeholderTextColor={COLORS.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>Confirm Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Repeat password"
            placeholderTextColor={COLORS.textMuted}
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.accent]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Create Account</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 0.48,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
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
  submitBtn: {
    marginTop: SPACING.xl,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.textMuted,
  },
  linkText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
