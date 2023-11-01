import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, useTheme } from "native-base";
import { Home } from "../screens/Home";
import { Cart } from "../screens/Cart";
import { ShoppingCart } from "phosphor-react-native";
import { useCart } from "../hooks/useCart";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const { cart } = useCart();
  //Calcular a quantidade de produtos inserido no carrinho
  const cartSize = cart.length;

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

      <Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <>
              <Text fontSize="8" color="#F0F0F3" fontWeight="600">
                {" "}
                {cartSize === 1 ? `${cartSize} ` : `${cartSize} `}
              </Text>
              <ShoppingCart color={color} size={sizes[6]} />
            </>
          ),
        }}
      />
    </Navigator>
  );
}
