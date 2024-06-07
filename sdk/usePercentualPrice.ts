export const usePercentualDiscount = (listPrice: number, price: number): string | void => {
  if (!listPrice || !price) return;

  const discount = ((listPrice - price) / listPrice) * 100;

  const percentualDiscount = Math.max(0, discount);
  return `${Math.round(percentualDiscount)}% OFF`;
};