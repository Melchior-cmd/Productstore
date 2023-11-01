import { ImageSourcePropType } from "react-native";

export interface ProductsCardProps {
  id: string;
  title: string;
  price: number;
  image?: ImageSourcePropType;
  priceFormatted: string;
  rating: {
    count: number;
  };
  quantity: number;
}
