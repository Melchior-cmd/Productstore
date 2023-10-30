import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, Icon } from "native-base";
import { Pressable } from "react-native";
import { CaretLeft } from "phosphor-react-native";

type Props = {
  title: string;
};

export function ScreenHeader({ title }: Props) {
  const { goBack } = useNavigation();

  return (
    <HStack
      w="full"
      h={24}
      pb={5}
      px={5}
      bg="gray.600"
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Pressable onPress={goBack}>
        <Icon as={CaretLeft} name="arrow-left" size={6} color="white" />
      </Pressable>

      <Heading color="white" fontSize="xl">
        {title}
      </Heading>

      <Box w={6} h={6} />
    </HStack>
  );
}
