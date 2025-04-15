import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Checkbox, IconButton, useTheme } from 'react-native-paper';
import { getCategoryColor } from '../utils/colors';

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  category?: string | null;
  isCompleted: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  category,
  isCompleted,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const categoryColor = category ? getCategoryColor(category) : undefined;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Checkbox
              status={isCompleted ? 'checked' : 'unchecked'}
              onPress={onToggle}
              color={categoryColor}
            />
            <Text
              variant="titleMedium"
              style={[
                styles.title,
                isCompleted && styles.completedTitle,
              ]}
            >
              {title}
            </Text>
          </View>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={onEdit}
              iconColor={theme.colors.primary}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={onDelete}
              iconColor={theme.colors.error}
            />
          </View>
        </View>
        {description && (
          <Text
            variant="bodyMedium"
            style={[
              styles.description,
              isCompleted && styles.completedDescription,
            ]}
          >
            {description}
          </Text>
        )}
        {category && (
          <View style={styles.categoryContainer}>
            <Text
              variant="labelSmall"
              style={[
                styles.category,
                isCompleted && styles.completedCategory,
              ]}
            >
              {category}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  content: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  description: {
    marginTop: 4,
    marginLeft: 40,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  categoryContainer: {
    marginTop: 4,
    marginLeft: 40,
  },
  category: {
    opacity: 0.7,
  },
  completedCategory: {
    opacity: 0.3,
  },
  actions: {
    flexDirection: 'row',
  },
}); 