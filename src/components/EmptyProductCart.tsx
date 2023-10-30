import { useNavigation } from "@react-navigation/native";
import { Pressable, Row, Text } from "native-base";

export function EmptyProductCart() {
  const { navigate } = useNavigation();
  return (
    <Row flexWrap="wrap" justifyContent="center" p={3}>
      <Text color="white" fontSize="md" textAlign="center">
        Seu carrinho está vazio que tal da uma olhada em nossos
      </Text>

      <Pressable onPress={() => navigate("products")}>
        <Text textDecorationLine="underline" color="yellow.500" mx={1}>
          Produtos
        </Text>
      </Pressable>
      <Text color="white" fontSize="md" textAlign="center">
        ?
      </Text>
    </Row>
  );
}
