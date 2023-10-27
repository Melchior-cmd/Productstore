import {
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { ImageSourcePropType } from "react-native";
import { Plus } from "phosphor-react-native";

export interface ProductsCardProps {
  id: string;
  title: string;
  price: number;
  image?: ImageSourcePropType;
  priceFormatted: string;
}

interface Props extends TouchableOpacityProps {
  data: ProductsCardProps;
}

export function ProductsCard({ data, ...rest }: Props) {
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
          <Heading color="white" fontFamily="heading" fontSize="lg" mt={3}>
            {data.title}
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {data.priceFormatted}
          </Text>
        </VStack>

        <TouchableOpacity onPress={() => null}>
          <Icon as={Plus} name="trash" size={6} color="green.500" />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  );
}
