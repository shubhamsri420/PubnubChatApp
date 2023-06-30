import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import useAuth from "./src/hooks/Auth/useAuth";
import Initializing from "./src/screens/Initializing";

export default function App() {
  const { initializing } = useAuth();
  return (
    <NavigationContainer>
      {initializing ? <Initializing /> : <RootNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
