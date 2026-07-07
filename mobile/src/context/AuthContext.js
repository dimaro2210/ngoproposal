import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, getProfile } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const res = await getProfile();
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await loginUser({ username, password });
    await AsyncStorage.setItem('access_token', res.data.access);
    await AsyncStorage.setItem('refresh_token', res.data.refresh);
    const profileRes = await getProfile();
    setUser(profileRes.data);
    setIsAuthenticated(true);
    return profileRes.data;
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
