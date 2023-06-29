import NavigationScreens from "./Navigators/NavigationScreens";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"white"} />
      <NavigationScreens />
    </>
  );
}
