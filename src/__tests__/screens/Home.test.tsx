import React from "react";
import AxiosMock from "axios-mock-adapter";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { Home } from "../../screens/Home";
import { api } from "../../services/api";
import { useCart } from "../../hooks/useCart";
import axios from "axios";

const apiMock = new AxiosMock(api);
const mockedAddProduct = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock("../../services/api");

describe("Home Page", () => {
  beforeAll(() => {
    apiMock.onGet("products").reply(200, [
      {
        id: 1,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        price: 109.95,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      },
      {
        id: 2,
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        price: 22.3,
        title: "Mens Casual Premium Slim Fit T-Shirts ",
      },
      {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      },
    ]);
  });

  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          id: 1,
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          price: 109.95,
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        },
        {
          id: 2,
          image:
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          price: 22.3,
          title: "Mens Casual Premium Slim Fit T-Shirts ",
        },
      ],
      addProduct: mockedAddProduct,
    });
  });

  it("should be able to render the list of products", async () => {
    const mockProducts = [{ id: 1, name: "Produto 1", price: 10 }];
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockProducts });

    const { getByText } = render(<Home />);

    await waitFor(() => {
      expect(getByText("Produto 1")).toBeDefined();
      expect(getByText("R$ 10,00")).toBeDefined();
    });
  });

  it("should be able to add a product to cart", () => {
    const { getAllByTestId } = render(<Home />);

    const [addFirstProduct] = getAllByTestId("add-product-button");

    fireEvent.press(addFirstProduct);

    expect(mockedAddProduct).toHaveBeenCalledWith(1);
  });
});
