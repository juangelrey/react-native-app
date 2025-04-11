import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Text, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import { Task } from './components/Task';
import { ProgressBar } from './components/ProgressBar';

const Stack = createNativeStackNavigator();

function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write detailed documentation for the new feature',
      deadline: new Date('2024-04-15'),
      category: 'Work',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and fruits',
      deadline: new Date('2024-04-12'),
      category: 'Shopping',
      isCompleted: true,
    },
  ]);

  const completedCount = todos.filter(todo => todo.isCompleted).length;

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <ProgressBar completed={completedCount} total={todos.length} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Task
            title={item.title}
            description={item.description}
            deadline={item.deadline}
            category={item.category}
            isCompleted={item.isCompleted}
            onToggle={() => toggleTodo(item.id)}
            onPress={() => console.log('Task pressed:', item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Add task pressed')}
      />
    </View>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      deadline: PropTypes.instanceOf(Date),
      category: PropTypes.string,
      isCompleted: PropTypes.bool.isRequired,
    })
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#4A90E2',
  },
  list: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4A90E2',
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={TodoList}
              options={{
                title: 'Todo List',
                headerStyle: {
                  backgroundColor: '#4A90E2',
                },
                headerTintColor: '#fff',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 