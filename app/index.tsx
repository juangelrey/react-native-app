import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { FAB, Text, ActivityIndicator, Card, Checkbox, Chip, IconButton } from 'react-native-paper';
import { router, useRouter } from 'expo-router';
import { Task } from '../components/Task';
import { ProgressBar } from '../components/ProgressBar';
import { useTodoContext } from '../contexts/TodoContext';
import { CategoryBadge } from '../components/CategoryBadge';
import { format } from 'date-fns';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

interface Todo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  createdAt: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { todos, toggleTodo, deleteTodo } = useTodoContext();
  const { theme } = useTheme();
  const [filter, setFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (!filter) return true;
    return todo.category === filter;
  });

  const handleEdit = (id: string) => {
    router.push({ pathname: '/edit-task' as any, params: { id } });
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Get unique categories from todos
  const categories = Array.from(new Set(todos.map(todo => todo.category).filter(Boolean))) as string[];

  const completedCount = filteredTodos.filter(todo => todo.completed).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemeToggle />
      
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Stuipid Tasks
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {completedCount} of {todos.length} completed
        </Text>
      </View>

      <ProgressBar
        completed={completedCount}
        total={todos.length}
      />

      <View style={styles.categoriesContainer}>
        {categories.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryBadge
                key={category}
                label={category}
                category={category}
                isSelected={filter === category}
                onPress={() => setFilter(filter === category ? null : category)}
              />
            ))}
          </ScrollView>
        )}
      </View>
      
      <ScrollView style={styles.scrollView}>
        {filteredTodos.map((todo) => (
          <Task
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            category={todo.category}
            isCompleted={todo.completed}
            onToggle={() => toggleTodo(todo.id)}
            onEdit={() => router.push({ pathname: '/add-task', params: { id: todo.id } } as any)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ScrollView>
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={() => router.push({ pathname: '/add-task' } as any)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginTop: 4,
    color: '#666',
  },
  categoryChip: {
    marginTop: 4,
    color: '#666',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666666',
  },
  badgesScroll: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  progressBar: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  tasksContainer: {
    flex: 1,
  },
}); 