import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Checkbox, IconButton } from 'react-native-paper';
import { getCategoryColor } from '../utils/colors';

interface TaskProps {
  title: string;
  description?: string;
  deadline?: Date;
  category?: string;
  isCompleted: boolean;
  onToggle: () => void;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function Task({
  title,
  description,
  deadline,
  category,
  isCompleted,
  onToggle,
  onPress,
  onEdit,
  onDelete,
}: TaskProps) {
  const categoryColor = getCategoryColor(category);

  return (
    <TouchableOpacity
      style={[styles.container, isCompleted && styles.completedContainer]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Checkbox
            status={isCompleted ? 'checked' : 'unchecked'}
            onPress={onToggle}
            color={categoryColor}
          />
          <Text
            style={[
              styles.title,
              isCompleted && styles.completedTitle,
            ]}
          >
            {title}
          </Text>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={onEdit}
              style={styles.actionButton}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={onDelete}
              style={styles.actionButton}
            />
          </View>
        </View>
        {description && (
          <Text
            style={[
              styles.description,
              isCompleted && styles.completedDescription,
            ]}
          >
            {description}
          </Text>
        )}
        {deadline && (
          <Text style={styles.deadline}>
            Due: {deadline.toLocaleDateString()}
          </Text>
        )}
        {category && (
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
  },
  deadline: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    margin: 0,
    padding: 0,
  },
}); 