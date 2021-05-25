import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Appbar, Menu } from "react-native-paper";
import AboutScreen from "../screens/AboutScreen";
import CountdownScreen from "../screens/CountdownScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const ABOUT_ROUTE_NAME = "About";
const SETTINGS_ROUTE_NAME = "Settings";
const RNP_BACKGROUND_PURPLE = "#6221EA"; // RNP = React Native Paper

function CustomNavigationBar({ navigation, previous }) {
  // TODO (P8): There's got to be a better way! ; but useNavigationState doesn't seem to work =(
  const routes = navigation.dangerouslyGetState().routes;
  const currentRoute = routes[routes.length - 1].name;

  const menuSettingsOption =
    currentRoute == SETTINGS_ROUTE_NAME ? null : (
      <Menu.Item
        onPress={() => {
          navigation.navigate(SETTINGS_ROUTE_NAME);
        }}
        title={SETTINGS_ROUTE_NAME}
      />
    );

  const menuAboutOption =
    currentRoute == ABOUT_ROUTE_NAME ? null : (
      <Menu.Item
        onPress={() => {
          navigation.navigate(ABOUT_ROUTE_NAME);
        }}
        title={ABOUT_ROUTE_NAME}
      />
    );

  const SettingsMenu = () => {
    const [menuVisible, setMenuVisible] = React.useState(false);
    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color="white"
            onPress={() => setMenuVisible(true)}
          />
        }
      >
        {menuSettingsOption}
        {menuAboutOption}
      </Menu>
    );
  };

  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          navigation.goBack();
        }}
        disabled={!previous}
        color={previous ? "white" : RNP_BACKGROUND_PURPLE}
      />
      <Appbar.Content title="Passgify" titleStyle={{ fontSize: 30 }} />
      <SettingsMenu />
    </Appbar.Header>
  );
}

const RootNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteNe="Home"
        screenOptions={{
          header: CustomNavigationBar,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Countdown" component={CountdownScreen} />
        <Stack.Screen name={SETTINGS_ROUTE_NAME} component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
