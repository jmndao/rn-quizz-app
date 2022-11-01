import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import FirebaseProvider from "./src/context/FirebaseContext";
import QuizzProvider from "./src/context/QuizzContext";
import { TabProvider } from "./src/context/TabContext";
import ThemeProvider from "./src/context/ThemeContext";
import { DrawerNavigator } from "./src/navigation/Navigation";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <ThemeProvider>
      <TailwindProvider>
        <FirebaseProvider>
          <NavigationContainer>
            <TabProvider>
              <QuizzProvider>
                <DrawerNavigator />
                <Toast />
              </QuizzProvider>
            </TabProvider>
          </NavigationContainer>
        </FirebaseProvider>
      </TailwindProvider>
    </ThemeProvider>
  );
}
