import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { themeType, setThemeType } = useAppTheme();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <IconButton
        icon={themeType === 'dark' ? 'weather-sunny' : 'weather-night'}
        size={24}
        onPress={() => setThemeType(themeType === 'dark' ? 'light' : 'dark')}
        style={[styles.button, { backgroundColor: theme.colors.surface }]}
        iconColor={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  button: {
    margin: 0,
    elevation: 2,
  },
}); 