import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons } from 'react-native-paper';
import { COLORS, SIZES, CATEGORIES } from '../constants/theme';
import { saveTasks, loadTasks } from '../utils/storage';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [deadline, setDeadline] = useState(task.deadline);

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    const tasks = await loadTasks();
    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        t.update(
          title.trim(),
          description.trim(),
          category,
          deadline
        );
      }
      return t;
    });

    await saveTasks(updatedTasks);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      
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

      <Text style={styles.label}>Category</Text>
      <SegmentedButtons
        value={category}
        onValueChange={setCategory}
        buttons={CATEGORIES.map(cat => ({
          value: cat.id,
          label: cat.name,
        }))}
        style={styles.segmentedButtons}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={!title.trim()}
        >
          Save Changes
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.text,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default EditTaskScreen; 