import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants';
import { createDonation, getPrograms } from '../services/api';
import axios from 'axios';

export default function DonationsScreen({ route, navigation }) {
  const selectedProgramId = route.params?.programId || null;
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [programId, setProgramId] = useState(selectedProgramId ? selectedProgramId.toString() : '');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await getPrograms();
      setPrograms(res.data);
      if (!programId && res.data.length > 0) {
        setProgramId(res.data[0].id.toString());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDonate = async () => {
    if (!donorName || !donorEmail || !amount) {
      Alert.alert('Validation Error', 'Please fill in all donation fields.');
      return;
    }

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid donation amount.');
      return;
    }

    setLoading(true);
    // Generate a unique reference prefix
    const reference = 'PAYSTACK-' + Math.random().toString(36).substring(2, 15).toUpperCase();

    try {
      // 1. Create a pending donation in the Django Database
      const donationPayload = {
        donor_name: donorName,
        donor_email: donorEmail,
        amount: amt,
        reference: reference,
        payment_status: 'pending',
      };
      if (programId) {
        donationPayload.program = parseInt(programId);
      }

      await createDonation(donationPayload);

      // 2. Simulate Paystack transaction complete instantly to reflect in stats
      Alert.alert(
        'Processing Secure Payment',
        'Simulating Paystack checkout transaction... The payment was successful!',
        [
          {
            text: 'OK',
            onPress: async () => {
              try {
                // Call Paystack Webhook simulator endpoint to mark the status successful
                await axios.post('http://127.0.0.1:8000/api/webhook/paystack/', {
                  event: 'charge.success',
                  data: { reference: reference },
                });
                Alert.alert('Success', 'Thank you! Your donation was successfully processed.', [
                  {
                    text: 'Done',
                    onPress: () => {
                      setAmount('');
                      navigation.navigate('Home');
                    },
                  },
                ]);
              } catch (e) {
                console.log(e);
                Alert.alert('Warning', 'Donation saved but simulation webhook failed.');
              }
            },
          },
        ]
      );
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Unable to initialize transaction record.');
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
          <Text style={styles.title}>Make a Contribution</Text>
          <Text style={styles.subtitle}>Enter donation details to simulate dynamic Paystack checkout.</Text>

          <Text style={styles.label}>Donor Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={COLORS.textMuted}
            value={donorName}
            onChangeText={setDonorName}
          />

          <Text style={styles.label}>Donor Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={COLORS.textMuted}
            value={donorEmail}
            onChangeText={setDonorEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Select Program / Campaign</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={programId}
              onValueChange={(itemValue) => setProgramId(itemValue)}
              style={styles.picker}
              dropdownIconColor="#FFF"
            >
              {programs.map((p) => (
                <Picker.Item key={p.id} label={p.title} value={p.id.toString()} color="#FFF" style={styles.pickerItem} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Donation Amount (₦)</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount in Naira"
            placeholderTextColor={COLORS.textMuted}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleDonate} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitText}>Complete Donation</Text>
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
  pickerContainer: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  picker: {
    color: '#FFF',
    width: '100%',
  },
  pickerItem: {
    backgroundColor: COLORS.surfaceLight,
  },
  submitBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  submitText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});
