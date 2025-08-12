import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, DefaultTheme } from "react-native-paper";

export default function RootLayout() {
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
      surface: 'white',
      primary: '#6200ee',
      text: 'black',
      placeholder: '#777'
    },
  };

  return (
    <PaperProvider theme={lightTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Task manager"
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
