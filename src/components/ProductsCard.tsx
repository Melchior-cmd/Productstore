import {
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Heading, HStack, Icon, Image, Text, Toast, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { useCart } from "../hooks/useCart";
import { ProductsCardProps } from "../types";
import { useNavigation } from "@react-navigation/native";

interface props extends TouchableOpacityProps {
  data: ProductsCardProps;
}

export function ProductsCard({ data, ...rest }: props) {
  const { navigate } = useNavigation();
  const { addProductCart } = useCart();

  async function handleAddProductToCart(id: string) {
    try {
      await addProductCart(id);

      Toast.show({
        title: "Produto adicionado no carrinho",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("cart");
    } catch (error) {
      Toast.show({
        title: "Não foi possível adicionar o produto no carrinho",
        placement: "top",
        bgColor: "reed.500",
      });
    }
  }

  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="gray.300"
        rounded="md"
        alignItems="center"
        justifyContent="space-between"
        p={4}
        mb={3}
      >
        <Image
          w={16}
          h={16}
          source={{ uri: data.image } as any}
          alt="Imagem do produto"
          resizeMode={Platform.OS === "android" ? "contain" : "cover"}
        />

        <VStack flex={1} ml={3}>
          <Heading color="white" fontFamily="heading" fontSize="lg" mt={1}>
            {data.title}
          </Heading>

          <Text color="gray.200" fontSize="sm" mt={3}>
            {data.priceFormatted}
          </Text>
        </VStack>

        <TouchableOpacity onPress={() => handleAddProductToCart(data.id)}>
          <Icon as={Plus} px={5} name="trash" size={6} color="green.500" />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  );
}
