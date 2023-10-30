import { useState } from "react";
import { HStack, Image, Input, Text, VStack, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProductsCardProps } from "../types";

type CartItemsProps = {
  onRemove: () => void;
  data: ProductsCardProps;
};

interface Props {
  data: ProductsCardProps;
}

export function CartItems({ data, onRemove, ...rest }: CartItemsProps) {
  const [quantity, setQuantity] = useState("1");

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 100,
        marginVertical: 6,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
      }}
      {...rest}
    >
      <VStack
        style={{
          width: "30%",
          height: 100,
          padding: 14,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F0F3",
          borderRadius: 10,
          marginRight: 22,
        }}
      >
        <Image
          source={{ uri: data.image } as any}
          alt="Product Image"
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </VStack>
      <VStack flex={1} height="100%" justifyContent="space-around">
        <VStack>
          <Text
            fontSize="14"
            maxWidth="100%"
            color="#F0F0F3"
            fontWeight="600"
            letterSpacing={1}
          >
            {data.title}
          </Text>
          <HStack
            marginTop={4}
            flexDirection="row"
            alignItems="center"
            opacity={0.6}
          >
            <Text
              fontSize="14"
              fontWeight="400"
              maxWidth="85%"
              color="#F0F0F3"
              marginRight={4}
            >
              {data.priceFormatted}
            </Text>
          </HStack>
        </VStack>
        <HStack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack flexDirection="row" alignItems="center" mt={3}>
            <TouchableOpacity
              onPress={null}
              style={{
                borderRadius: 100,
                marginRight: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: "#F0F0F3",
                opacity: 0.5,
              }}
            >
              <MaterialCommunityIcons
                name="minus"
                style={{
                  fontSize: 16,
                  color: "#F75A68",
                }}
                onPress={null}
              />
            </TouchableOpacity>
            <Input
              onChangeText={setQuantity}
              textAlign="center"
              type="text"
              isDisabled={true}
              value={quantity}
              h={6}
              w={12}
              color="#F0F0F3"
            />
            <TouchableOpacity
              style={{
                borderRadius: 100,
                marginLeft: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: "#F0F0F3",
                opacity: 0.5,
              }}
            >
              <MaterialCommunityIcons
                name="plus"
                style={{
                  fontSize: 16,
                  color: "#00B37E",
                }}
                onPress={null}
              />
            </TouchableOpacity>
          </HStack>
          <TouchableOpacity onPress={onRemove}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={{
                marginBottom: 10,
                fontSize: 25,
                color: "#F75A68",
                backgroundColor: "#121214",
                padding: 8,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
