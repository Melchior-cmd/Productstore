import { Center, HStack, Text, VStack } from "native-base";
import { Header } from "../components/Header";

export function Home() {
  return (
    <VStack flex={1}>
      <Header title="Meus Sushi" showBackButton />
    </VStack>
  );
}
