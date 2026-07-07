import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants';

const customTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.accent,
    background: COLORS.background,
    surface: COLORS.surface,
  },
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="light" />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
