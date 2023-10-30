import { FlatList, HStack, Text, VStack, useToast } from "native-base";

import { useCart } from "../hooks/useCart";

import { Button } from "../components/Button";
import { CartItems } from "./CartItems";
import { ProductsCardProps } from "../types";
import { formatPrice } from "../util/format";
import { ListRenderItemInfo } from "react-native";
import { EmptyProductCart } from "./EmptyProductCart";

export function ItemsCart() {
  const { cart, removeProductCart } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price;
    }, 0)
  );
  const toast = useToast();

  async function handleRemoveProduct(productId: string) {
    try {
      await removeProductCart(productId);

      toast.show({
        title: "Produto removido",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      toast.show({
        title: "Não foi possível remover o produto",
        placement: "top",
        bgColor: "reed.500",
      });
    }
  }

  return (
    <VStack flex={1}>
      <FlatList
        data={cartFormatted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: ListRenderItemInfo<ProductsCardProps>) => (
          <CartItems
            data={item}
            onRemove={() => handleRemoveProduct(item.id)}
          />
        )}
        ListEmptyComponent={() => <EmptyProductCart />}
        _contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        px={8}
        mt={2}
      />
      {cart.length > 0 && (
        <HStack
          flex={2}
          justifyContent="space-between"
          alignItems="flex-end"
          position="fixed"
        >
          <Text color="gray.200" fontSize="sm">
            TOTAL:
          </Text>
          <Text color="gray.200" fontSize="xl">
            {total}
          </Text>
        </HStack>
      )}

      {cart.length > 0 && <Button title="Finalizar compra" mr={2} my={3} />}
    </VStack>
  );
}
