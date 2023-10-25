import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
      }}
    >
      <Screen
        name="products"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home-outline" color={color} size={sizes[6]} />
          ),
        }}
      />
    </Navigator>
  );
}
