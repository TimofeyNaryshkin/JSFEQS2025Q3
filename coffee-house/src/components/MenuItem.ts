import type { Product } from "../types/product";
import createElement from "../utils/create-element";

export const MenuItem = (product: Product) => {
  const item = createElement("div", "menu__item");
  const itemImg = createElement(
    "div",
    `menu__item__img ${product.category}_${product.id}`
  );
  const itemText = createElement("div", "menu__item__text");
  const name = createElement("h3", undefined, product.name);
  const description = createElement("p", "medium", product.description);
  const price = createElement("h3", undefined, `$${product.price}`);

  itemText.append(name);
  itemText.append(description);
  itemText.append(price);
  item.append(itemImg);
  item.append(itemText);

  return item;
};
