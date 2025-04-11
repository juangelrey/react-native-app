import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useTodoContext } from '../contexts/TodoContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { todos, updateTodo } = useTodoContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Find the task to edit
    const taskToEdit = todos.find(todo => todo.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setCategory(taskToEdit.category || '');
    }
  }, [id, todos]);

  const handleSubmit = () => {
    if (title.trim() && id) {
      updateTodo(id, {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
      });
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
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
        Save Changes
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