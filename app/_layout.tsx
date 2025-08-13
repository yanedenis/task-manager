import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Task manager",
            headerStyle: {
              backgroundColor: colors.backgroundLightened,
            },
            headerTintColor: colors.textLight,
            headerShadowVisible: false,
          }}
        />
      </Stack>
      <Toast />
    </PaperProvider>
  );
}
