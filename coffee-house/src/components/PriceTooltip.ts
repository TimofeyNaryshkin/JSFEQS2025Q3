import createElement from "../utils/create-element";

export const PriceTiiltip = (price: string, discountPrice?: string) => {
  const priceTooltip = createElement("div", "price-tooltip");
  if (discountPrice) {
    const originalPrice = createElement(
      "span",
      "price-tooltip_original",
      `$${price}`
    );
    const discountedPrice = createElement(
      "span",
      "price-tooltip_discounted",
      `$${discountPrice}`
    );
    priceTooltip.append(originalPrice, discountedPrice);
  } else {
    const normalPrice = createElement(
      "span",
      "price-tooltip_normal",
      `$${price}`
    );
    priceTooltip.append(normalPrice);
  }
  return priceTooltip;
}