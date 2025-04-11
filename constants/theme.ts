import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4A90E2',
    secondary: '#6B7280',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#EF4444',
    success: '#10B981',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#60A5FA',
    secondary: '#9CA3AF',
    background: '#1F2937',
    surface: '#374151',
    error: '#F87171',
    success: '#34D399',
  },
}; 