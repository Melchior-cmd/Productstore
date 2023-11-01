export const { format: formatPrice } = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});

export const getNumberOfString = (value: string) => {
  let newValue = value.replace(/[^0-9]/g, "");
  console.log(newValue);

  newValue = Number(newValue)?.toFixed(2).replace(".", ",");

  return newValue;
};
