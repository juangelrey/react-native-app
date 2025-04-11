import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useTheme } from '../contexts/ThemeContext';
import { TodoProvider } from '../contexts/TodoContext';

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
        <Stack.Screen name="edit-task" options={{ title: 'Edit Task' }} />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
          <RootLayoutNav />
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
} 