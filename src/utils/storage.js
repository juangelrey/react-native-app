import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../models/Task';

const TASKS_STORAGE_KEY = '@todo_tasks';

export const saveTasks = async (tasks) => {
  try {
    const jsonTasks = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonTasks);
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasks = async () => {
  try {
    const jsonTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (jsonTasks) {
      const tasksData = JSON.parse(jsonTasks);
      return tasksData.map(task => new Task(
        task.id,
        task.title,
        task.description,
        task.category,
        task.deadline ? new Date(task.deadline) : null,
        task.isCompleted
      ));
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}; 