import type { Product } from "../types/product";
import createElement from "../utils/create-element";

export const SliderCard = (product: Product) => {
  const card = createElement("div", "slider__content__card");
  const cardImg = createElement(
    "div",
    `slider__content__card__img img_${product.id}`
  );
  const cardText = createElement("div");
  const name = createElement("h3", undefined, product.name);
  const description = createElement("p", "medium", product.description);
  const price = createElement("h3", undefined, `$${product.price}`);

  cardText.append(name);
  cardText.append(description);
  cardText.append(price);
  card.append(cardImg);
  card.append(cardText);

  return card;
};
