import { Box, HStack, Heading } from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { ButtonIcon } from "./ButtonIcon";
import { useNavigation } from "@react-navigation/native";

interface HomeProps {
  title: string;
  showBackButton?: boolean;
}

export function Header({ title = "", showBackButton = false }: HomeProps) {
  const { navigate } = useNavigation();

  const EmptyBoxSpace = () => <Box w={6} h={6} />;

  return (
    <HStack w="full" h={24} pb={5} px={5} bg="gray.600" alignItems="flex-end">
      {showBackButton ? (
        <ButtonIcon icon={CaretLeft} onPress={() => navigate("products")} />
      ) : (
        <EmptyBoxSpace />
      )}
      <HStack w="full" alignItems="center" justifyContent="center">
        <Heading color="white" fontSize="xl">
          {title}
        </Heading>
      </HStack>
    </HStack>
  );
}
