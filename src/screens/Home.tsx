import { FlatList, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import { useCallback, useState } from "react";
import { ProductsCard } from "../components/ProductsCard";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import { EmptyProductList } from "../components/EmptyProductList";
import { formatPrice } from "../util/format";
import { api } from "../services/api";
import { ProductsCardProps } from "../types";

export function Home() {
  const [products, setProducts] = useState<ProductsCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  //Função responsavel por listar os produtos da API faker
  async function fetchProducts() {
    try {
      setIsLoading(true);

      const response = await api.get("products");
      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    } catch (error) {
      toast.show({
        title: "Não foi possivel encontrar os produtos",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <Header title="Meus Produtos" showBackButton={false} />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductsCard data={item} />}
          ListEmptyComponent={() => <EmptyProductList />}
          _contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          px={7}
          mt={3}
        />
      )}
    </VStack>
  );
}
