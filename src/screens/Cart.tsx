import { VStack } from "native-base";
import { ScreenHeader } from "../components/ScreenCartHeader";
import { ItemsCart } from "../components/ItemsCart";

export function Cart() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Carrinho" />
      <ItemsCart />
    </VStack>
  );
}
