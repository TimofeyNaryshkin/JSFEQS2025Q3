import type { Product } from "../types/product";
import createElement from "../utils/create-element";

export const MenuItem = (product: Product) => {
  const item = createElement("div", "menu__item");
  item.setAttribute("data-id", product.id.toString());
  const itemImg = createElement(
    "div",
    `menu__item__img ${product.category}_${product.id}`
  );
  const itemText = createElement("div", "menu__item__text");
  const name = createElement("h3", undefined, product.name);
  const description = createElement("p", "medium", product.description);
  const priceContainer = createElement("div", "menu__item__price");
  const price = createElement("h3", "menu__item__price_original", `$${product.price}`);
  const discountedPrice = createElement(
    "h3",
    "menu__item__price_discount hidden",
    `$${product.discountPrice}`
  );

  priceContainer.append(discountedPrice, price);
  itemText.append(name, description, priceContainer);
  item.append(itemImg);
  item.append(itemText);

  return item;
};
