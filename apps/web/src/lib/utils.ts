export const numberFormatter = (value: number) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return formatter.format(value);
};
