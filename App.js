import NavigationScreens from "./Navigators/NavigationScreens";
import { StatusBar } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor={"white"} />
        <NavigationScreens />
      </Provider>
    </>
  );
}
