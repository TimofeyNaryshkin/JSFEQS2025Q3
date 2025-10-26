import type { TCartItem } from "../types/cart";
import createElement from "../utils/create-element";

export const CartItem = (item: TCartItem) => {
  const cartItem = createElement("div", "cart__item");
  const removeButton = createElement("button", "button button_cart-item__remove action");
  removeButton.setAttribute("data-product-id", item.id.toString());
  const itemImage = createElement("div", "cart__item__image");
  const itemDescription = createElement("div", "cart__item__description");
  const itemTitle = createElement("h3", undefined, item.name);
  const itemOptions = createElement("p", "medium", `${[item.size, ...item.extras].join(',')}`);
  const itemPriceContainer = createElement("div", "cart__item__price-container");
  const itemPrice = createElement("p", "cart__item__price", `${item.size}`);
  const itemDiscountPrice = createElement("p", "cart__item__discount-price", `${item.discountPrice}`);

  itemDescription.append(itemTitle, itemOptions);
  itemPriceContainer.append(itemPrice, itemDiscountPrice);
  cartItem.append(removeButton, itemImage, itemDescription, itemPriceContainer);

  removeButton.addEventListener("click", () => {

  })
  return cartItem;
};