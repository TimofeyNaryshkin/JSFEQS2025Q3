import type { RegistrationResponseData } from "../types/auth";
import type { TCartItem } from "../types/cart";
import createElement from "../utils/create-element";
import { userState } from "../utils/state";
import { AuthButtons } from "./AuthButtons";
import { CartItem } from "./CartItem";

const getCartStorage = () => localStorage.getItem("cart") ?? "[]";
const cartButton = createElement("a", "button_cart action hidden");
const cartWrapper = document.querySelector<HTMLDivElement>(".cart-wrapper");
const cartList = createElement("div", "cart__list");
const totalPrice = createElement("h3");
const totalDicsountedPrice = createElement("h3");
const userInfo = createElement("div", "cart__user-info hidden");
const userAddress = createElement("h3");
const userPayBy = createElement("h3");
const confirmButton = createElement(
  "button",
  "button action button_confirm",
  "Confirm"
);

const authButtons = AuthButtons();

export const CartButton = () => {
  const cartIcon = createElement("div", "button_cart__icon");
  const countSpan = createElement("span", "button_cart__count");
  cartButton.append(cartIcon, countSpan);
  cartButton.setAttribute("href", "./cart.html");
  const headerLinksContainer = document.querySelector<HTMLDivElement>(
    ".header__links-container"
  );
  headerLinksContainer?.prepend(cartButton);
  updateCart(getCartStorage());
};

export const Cart = () => {
  if (!cartWrapper) return;
  const heading = createElement("h2", undefined, "Cart");
  const cartContainer = createElement("div", "cart__container");
  const cartTotal = createElement("div", "cart__total");
  const totalText = createElement("h3", undefined, "Total:");
  const cartPriceContainer = createElement("div", "cart__price-container");
  const userAddressContainer = createElement("div", "cart__user-info__address");
  const userPayByContainer = createElement("div", "cart__user-info__payby");
  const userAddressText = createElement("h3", undefined, "Address:");
  const userPayByText = createElement("h3", undefined, "Pay By:");
  userAddressContainer.append(userAddressText, userAddress);
  userPayByContainer.append(userPayByText, userPayBy);
  userInfo.append(userAddressContainer, userPayByContainer);

  cartPriceContainer.append(totalPrice, totalDicsountedPrice);
  cartTotal.append(totalText, cartPriceContainer);
  cartContainer.append(cartList, cartTotal, userInfo);

  cartWrapper.append(heading, cartContainer, authButtons, confirmButton);

  updateCart(getCartStorage());
};

export const updateCart = (newCartStorage: string) => {
  localStorage.setItem("cart", newCartStorage);
  const cartItems = JSON.parse(getCartStorage()) as TCartItem[];
  const countSpan = cartButton.querySelector<HTMLSpanElement>(
    ".button_cart__count"
  );
  if (countSpan) {
    countSpan.innerText = cartItems.length ? cartItems.length.toString() : "";
  }

  cartButton.classList.toggle("hidden", !userState() && !cartItems.length);
  userInfo.classList.toggle("hidden", !userState());
  confirmButton.classList.toggle("hidden", !userState() || !cartItems.length);
  fillUserData();

  const cartItemsNodes = cartItems.map(CartItem);
  cartList.replaceChildren(...cartItemsNodes);
  const newPrice = calcCartTotal(cartItems);
  totalPrice.innerText = `$${newPrice[0].toFixed(2)}`;
  totalDicsountedPrice.innerText = `$${newPrice[1].toFixed(2)}`;

  authButtons.classList.toggle("hidden", !!userState());
  totalPrice.classList.toggle(
    "line-through",
    !!userState() && newPrice[1] !== 0
  );
  totalDicsountedPrice.classList.toggle(
    "hidden",
    !userState() || newPrice[1] === 0
  );
};

const calcCartTotal = (items: TCartItem[]) => {
  return items.reduce(
    (acc, item) => {
      acc[0] += parseFloat(item.prise);
      acc[1] += parseFloat(item.discountPrice);
      return acc;
    },
    [0, 0]
  );
};

export const addToCart = (item: TCartItem) => {
  const cartItems = JSON.parse(getCartStorage()) as TCartItem[];
  cartItems.push(item);
  const newCartStorage = JSON.stringify(cartItems);
  updateCart(newCartStorage);
};

export const removeFromCart = (item: TCartItem) => {
  const cartItems = JSON.parse(getCartStorage()) as TCartItem[];
  const removedItem = cartItems.find(
    (cartItem) =>
      cartItem.name === item.name &&
      cartItem.extras.join() === item.extras.join() &&
      cartItem.size === item.size
  );
  const newCartStorage = JSON.stringify(
    cartItems.filter((cartItem) => cartItem !== removedItem)
  );
  updateCart(newCartStorage);
};

export const handleLogin = () => {
  const userString = userState();
  if (userString === null) return;
  authButtons.classList.toggle("hidden", !!userString);
  cartButton.classList.toggle("hidden", !userString);
  userInfo.classList.toggle("hidden", !userString);
  confirmButton.classList.toggle("hidden", !userString);
  fillUserData();
};

const fillUserData = () => {
  const userString = userState();
  if (userString === null) return;
  const userData = JSON.parse(userString) as RegistrationResponseData;
  const address = `${userData.user.city}, ${userData.user.street}, ${userData.user.houseNumber}`;
  userAddress.textContent = address;
  const payby =
    userData.user.paymentMethod[0].toUpperCase() +
    userData.user.paymentMethod.slice(1);
  userPayBy.textContent = payby;
};
