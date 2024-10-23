import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddRecipeScreen from "./src/screens/AddRecipeScreen";
import Login from "./src/screens/auths/Login";
import RegisterScreen from "./src/screens/auths/Register";
import HomeScreen from "./src/screens/HomeScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.navigate(route.name);
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }
            return null;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="plus-square" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
