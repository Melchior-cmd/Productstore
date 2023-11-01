import { useState } from "react";
import { FlatList, HStack, Text, VStack, useToast } from "native-base";

import { useCart } from "../hooks/useCart";

import { Button } from "../components/Button";
import { CartItems } from "./CartItems";
import { ProductsCardProps } from "../types";
import { formatPrice } from "../util/format";
import { ListRenderItemInfo } from "react-native";
import { EmptyProductCart } from "./EmptyProductCart";
import { Loading } from "./Loading";

export function ItemsCart() {
  const { cart, removeProductCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  // Mapeia cada produto no carrinho e cria uma nova estrutura de dados formatada
  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: product.price,
  }));

  // Calcula o total dos preços dos produtos no carrinho e formata o resultado
  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price;
    }, 0)
  );

  const toast = useToast();

  //função responsavel por renderizar  o componente CartItems no Flatlist
  const renderCart = (entry: ListRenderItemInfo<ProductsCardProps>) => {
    const { item } = entry;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <CartItems data={item} onRemove={() => handleRemoveProduct(item.id)} />
    );
  };

  // Remover os Produtos do carrinho
  async function handleRemoveProduct(productId: string) {
    setIsLoading(true);
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
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1}>
      <FlatList
        data={cartFormatted}
        keyExtractor={(item) => item.id}
        renderItem={renderCart}
        ListEmptyComponent={() => <EmptyProductCart />}
        _contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
        px={8}
        mt={2}
      />

      {cart.length > 0 && (
        <HStack flex={1} justifyContent="space-between" alignItems="flex-end">
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
