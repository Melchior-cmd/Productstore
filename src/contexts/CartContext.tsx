import { createContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "native-base";
import { api } from "../services/api";
import { ProductsCardProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartProviderProps {
  children: ReactNode;
}

export interface CartContextDataProps {
  addProductCart: (productId: string) => Promise<void>;
  removeProductCart: (productId: string) => void;
  cart: ProductsCardProps[];
}

export const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps
);

export function CartContextProvider({
  children,
}: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<ProductsCardProps[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const storagedCart = await AsyncStorage.getItem("@ProductsStore:cart");

      if (storagedCart) {
        setCart(JSON.parse(storagedCart));
      }
    };

    loadCart();
  }, []);

  const toast = useToast();

  const addProductCart = async (productId: string) => {
    try {
      const updatedCart = [...cart];
      // const productExists = updatedCart.find(
      //   (product) => product.id === productId
      // );
      const product = await api.get(`/products/${productId}`);
      console.log(product);

      const newProduct = {
        ...product.data,
        count: 1,
      };

      updatedCart.push(newProduct);

      setCart(updatedCart);
      AsyncStorage.setItem("@ProductsStore:cart", JSON.stringify(updatedCart));
    } catch {
      toast.show({
        title: "Erro na adição do produto",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const removeProductCart = (productId: string) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        AsyncStorage.setItem(
          "@ProductsStore:cart",
          JSON.stringify(updatedCart)
        );
      } else {
        throw Error();
      }
    } catch {
      toast.show({
        title: "Erro na remoção do produto",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProductCart, removeProductCart }}>
      {children}
    </CartContext.Provider>
  );
}
