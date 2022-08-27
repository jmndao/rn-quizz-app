import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import FirebaseProvider from "./src/context/FirebaseContext";
import QuizzProvider from "./src/context/QuizzContext";
import { TabProvider } from "./src/context/TabContext";
import { DrawerNavigator } from "./src/navigation/Navigation";

export default function App() {
  return (
    <TailwindProvider>
      <FirebaseProvider>
        <NavigationContainer>
          <TabProvider>
            <QuizzProvider>
              <DrawerNavigator />
            </QuizzProvider>
          </TabProvider>
        </NavigationContainer>
      </FirebaseProvider>
    </TailwindProvider>
  );
}
