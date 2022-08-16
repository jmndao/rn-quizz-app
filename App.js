import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import { TabProvider } from "./src/context/TabContext";
import { DrawerNavigator } from "./src/navigation/Navigation";

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <TabProvider>
          <DrawerNavigator />
        </TabProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}
