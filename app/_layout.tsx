import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TodoProvider } from '../contexts/TodoContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
          <PaperProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="add-task"
                options={{
                  presentation: 'modal',
                  title: 'Add Task',
                }}
              />
              <Stack.Screen name="edit-task" options={{ title: 'Edit Task' }} />
            </Stack>
          </PaperProvider>
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
} 