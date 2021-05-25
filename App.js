import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigator from "./navigation/RootNavigator";
import { persistor, store } from "./redux/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  );
}
