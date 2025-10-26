import type { Product } from "../types/product";
import createElement from "../utils/create-element";

let cartStorage = localStorage.getItem("cart") ?? "[]";
const cart = createElement("a", "button_cart action");

export const Cart = () => {
  const cartItems = JSON.parse(cartStorage) as Product[];
  cart.innerText = cartItems.length ? cartItems.length.toString() : "";
  const cartIcon = createElement("div", "cart__icon");
  cart.append(cartIcon);
  const headerLinksContainer = document.querySelector<HTMLDivElement>(
    ".header__links-container"
  );
  headerLinksContainer?.prepend(cart);
};

export const updateCart = (newCartStorage: string) => {
  localStorage.setItem("cart", newCartStorage);
  cartStorage = newCartStorage;
  const cartItems = JSON.parse(cartStorage) as Product[];
  cart.innerText = cartItems.length ? cartItems.length.toString() : "";
};
