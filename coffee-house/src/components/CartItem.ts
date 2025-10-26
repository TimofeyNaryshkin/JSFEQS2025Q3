import type { TCartItem } from "../types/cart";
import createElement from "../utils/create-element";

export const CartItem = (item: TCartItem) => {
  const cartItem = createElement("div", "cart__item");
  const cartItemInfo = createElement("div", "cart__item__info");
  const removeButton = createElement(
    "button",
    "button button_cart-item_remove action"
  );
  removeButton.setAttribute("data-product-id", item.id.toString());
  const itemImage = createElement("div", `cart__item__image ${item.categoty}_${item.id}`);
  const itemDescription = createElement("div", "cart__item__description");
  const itemTitle = createElement("h3", undefined, item.name);
  const itemOptions = createElement(
    "p",
    "medium",
    `${[item.size, ...item.extras].join(", ")}`
  );
  const itemPriceContainer = createElement(
    "div",
    "cart__item__price-container"
  );
  const itemPrice = createElement("h3", "cart__item__price", `$${item.prise}`);
  const itemDiscountPrice = createElement(
    "h3",
    "cart__item__discount-price",
    `$${item.discountPrice}`
  );

  itemDescription.append(itemTitle, itemOptions);
  itemPriceContainer.append(itemPrice, itemDiscountPrice);
  cartItemInfo.append(removeButton, itemImage, itemDescription);
  cartItem.append(cartItemInfo, itemPriceContainer);

  removeButton.addEventListener("click", () => {});
  return cartItem;
};
