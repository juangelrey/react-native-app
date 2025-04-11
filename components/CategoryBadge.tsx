import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { getCategoryColor } from '../utils/colors';

interface CategoryBadgeProps {
  label: string;
  category: string | null;
  isSelected: boolean;
  onPress: () => void;
}

export function CategoryBadge({ label, category, isSelected, onPress }: CategoryBadgeProps) {
  const categoryColor = getCategoryColor(category || undefined);
  
  return (
    <TouchableOpacity
      style={[
        styles.badge,
        { 
          backgroundColor: categoryColor,
          opacity: isSelected ? 1 : 0.3,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isSelected && styles.selectedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedText: {
    color: '#FFFFFF',
  },
}); 