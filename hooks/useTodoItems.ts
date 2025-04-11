import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  category?: string;
  isCompleted: boolean;
}

const STORAGE_KEY = '@todo_items';

export function useTodoItems() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from storage on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTodos();
    }
  }, [todos, isLoading]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Loaded todos from storage:', storedTodos);
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        // Convert string dates back to Date objects
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          deadline: todo.deadline ? new Date(todo.deadline) : undefined,
        }));
        setTodos(todosWithDates);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTodos = async () => {
    try {
      // Convert Date objects to strings for storage
      const todosForStorage = todos.map(todo => ({
        ...todo,
        deadline: todo.deadline?.toISOString(),
      }));
      console.log('Saving todos to storage:', todosForStorage);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todosForStorage));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = (todo: Omit<TodoItem, 'id'>) => {
    console.log('Adding new todo:', todo);
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(),
    };
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      console.log('Updated todos state:', updatedTodos);
      return updatedTodos;
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<TodoItem>) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
} 