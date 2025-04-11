import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, ProgressBar, Text, Card, Checkbox, Button } from 'react-native-paper';
import { COLORS, SIZES } from '../constants/theme';
import { loadTasks, saveTasks } from '../utils/storage';
import { Task } from '../models/Task';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  const loadTasksFromStorage = async () => {
    const loadedTasks = await loadTasks();
    setTasks(loadedTasks);
  };

  const handleTaskComplete = async (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.toggleComplete();
      }
      return task;
    });
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    return completedTasks / tasks.length;
  };

  const renderTask = ({ item }) => (
    <Card style={styles.taskCard}>
      <Card.Content>
        <View style={styles.taskHeader}>
          <Checkbox
            status={item.isCompleted ? 'checked' : 'unchecked'}
            onPress={() => handleTaskComplete(item.id)}
          />
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
        {item.description && (
          <Text style={styles.taskDescription}>{item.description}</Text>
        )}
        {item.deadline && (
          <Text style={styles.taskDeadline}>
            Due: {new Date(item.deadline).toLocaleDateString()}
          </Text>
        )}
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('EditTask', { task: item })}>
          Edit
        </Button>
        <Button onPress={() => handleDeleteTask(item.id)}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progress: {Math.round(calculateProgress() * 100)}%
        </Text>
        <ProgressBar
          progress={calculateProgress()}
          color={COLORS.accent}
          style={styles.progressBar}
        />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: COLORS.secondary,
  },
  progressText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  taskList: {
    flex: 1,
    padding: 16,
  },
  taskCard: {
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: SIZES.title,
    marginLeft: 8,
    flex: 1,
  },
  taskDescription: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
    marginTop: 8,
  },
  taskDeadline: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
});

export default HomeScreen; 