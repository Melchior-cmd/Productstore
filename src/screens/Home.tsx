import { Center, HStack, Text, VStack } from "native-base";

export function Home() {
  return (
    <VStack flex={1}>
      <HStack pt={16} pb={5} px={8} bg="gray.600" alignItems="center">
        <Text color={"white"} fontSize="md" fontFamily="heading">
          TELA HOME
        </Text>
      </HStack>
    </VStack>
  );
}
