import { Center, HStack, Row, Text, VStack } from "native-base";

export function EmptyProductList() {
  return (
    <Center flex={1} p={15}>
      <Text color="white" fontSize="md" textAlign="center">
        Lista de produtos está vazia, porfavor verifica o problema!.
      </Text>
    </Center>
  );
}
