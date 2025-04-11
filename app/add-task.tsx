import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useTodoContext } from '../contexts/TodoContext';

export default function AddTaskScreen() {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    if (title.trim()) {
      console.log('Submitting new task...');
      addTodo({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        isCompleted: false,
      });
      // Add a small delay to ensure state is updated
      setTimeout(() => {
        console.log('Navigating back...');
        router.back();
      }, 100);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={4}
      />
      <TextInput
        label="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!title.trim()}
      >
        Add Task
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4A90E2',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#4A90E2',
  },
}); 