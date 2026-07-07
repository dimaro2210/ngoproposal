import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useAuth } from '../context/AuthContext';

// Import Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProgramDetailScreen from '../screens/ProgramDetailScreen';
import DonationsScreen from '../screens/DonationsScreen';
import VolunteersScreen from '../screens/VolunteersScreen';
import NewsScreen from '../screens/NewsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home-outline';
          } else if (route.name === 'Programs') {
            iconName = 'heart-half-outline';
          } else if (route.name === 'Donations') {
            iconName = 'cash-outline';
          } else if (route.name === 'Volunteers') {
            iconName = 'shirt-outline';
          } else if (route.name === 'News') {
            iconName = 'newspaper-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: COLORS.surface,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Programs" component={ProgramsScreen} options={{ title: 'Campaigns' }} />
      <Tab.Screen name="Donations" component={DonationsScreen} options={{ title: 'Donate' }} />
      <Tab.Screen name="Volunteers" component={VolunteersScreen} options={{ title: 'Volunteer' }} />
      <Tab.Screen name="News" component={NewsScreen} options={{ title: 'Updates' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // Or custom loading spinner

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainApp" component={TabNavigator} />
          <Stack.Screen
            name="ProgramDetail"
            component={ProgramDetailScreen}
            options={{
              headerShown: true,
              title: 'Campaign Details',
              headerStyle: { backgroundColor: COLORS.surface },
              headerTintColor: '#FFF',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
