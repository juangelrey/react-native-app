# To-Do List Mobile Application

A simple and intuitive to-do list application built with React Native and Expo.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete
- Categorize tasks (Work, Personal, Shopping, Other)
- Track progress with a visual progress bar
- Set deadlines for tasks
- Clean and modern UI
- Persistent storage using AsyncStorage

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm (`npm install -g pnpm`)
- Expo CLI (`pnpm add -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm start
   ```

### Running the App

- For iOS: `pnpm run ios`
- For Android: `pnpm run android`
- For web: `pnpm run web`

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── screens/        # Screen components
  ├── utils/          # Utility functions
  ├── constants/      # Theme and other constants
  └── models/         # Data models
```

## Technologies Used

- React Native
- Expo
- React Navigation
- React Native Paper
- AsyncStorage

## License

This project is licensed under the MIT License.
