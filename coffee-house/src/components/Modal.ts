import { productByIdService } from "../services/product-service";
import type { TCartItem } from "../types/cart";
import type { Additive, ProductDetails, ProductSizes } from "../types/product";
import createElement from "../utils/create-element";
import { AdditiveButton } from "./AdditiveButton";
import { addToCart } from "./Cart";
import { ErrorNotification } from "./ErrorNotification";
import Loader from "./Loader";
import { SizeButton } from "./SizeButton";

let isModalOpened = false;

const overlay = createElement("div", "overlay");
document.body.append(overlay);

function handleModal() {
  isModalOpened = !isModalOpened;
  overlay.classList.toggle("opened", isModalOpened);
  document.body.classList.toggle("no-scroll", isModalOpened);
}

overlay.addEventListener("click", (e) => {
  if (
    e.target &&
    e.target instanceof HTMLElement &&
    !e.target.classList.contains("overlay")
  )
    return;
  handleModal();
});

export async function openModal(id: string, img: Node) {
  handleModal();

  const loader = Loader();
  overlay.replaceChildren(loader);

  const product = await productByIdService(id);
  loader.remove();
  if (!product) {
    handleModal();
    const errorNotification = ErrorNotification();
    document.body.append(errorNotification);
    errorNotification.classList.add("visible");
    return;
  }

  const modalContent = createElement("div", "modal__content");
  const addToCartButton = createElement(
    "button",
    "button button_add-to-cart action",
    "Add to cart"
  );
  const closeButton = createElement(
    "button",
    "button button_modal_close action"
  );
  closeButton.addEventListener("click", handleModal);
  addToCartButton.addEventListener("click", () =>
    addToCartButtonHandler(product)
  );
  const text = createElement("div", "modal__content__text");
  const title = createElement("h3", undefined, product.name);
  const description = createElement("p", "medium desc", product.description);

  sizePrice.original = parseFloat(product.price);

  text.append(
    title,
    description,
    renderSizes(product.sizes),
    renderAdditives(product.additives),
    renderPrice(product.price),
    addToCartButton
  );
  modalContent.append(closeButton, img, text);
  overlay.replaceChildren(modalContent);
}

let selectedSize = "";
let sizePrice = {
  original: 0,
  discounted: 0,
};
let additivesPrice = {
  original: 0,
  discounted: 0,
};
const extras: string[] = [];

function renderSizes(sizes: ProductSizes) {
  const sizeSelection = createElement(
    "div",
    "modal__item__size modal__item__info"
  );
  const sizeTitle = createElement("p", "medium modal__item__select", "Size");
  const sizeButtons = createElement("div", "menu__item__buttons");
  const buttons = Object.entries(sizes).map(SizeButton);
  sizeButtons.append(...buttons);
  sizeSelection.append(sizeTitle, sizeButtons);
  selectedSize = sizes.s.size

  sizeButtons.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const button = e.target.closest<HTMLButtonElement>(".button_option_size");
    if (!button) return;

    buttons.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    selectedSize = button.innerText;

    const sizeKey = button.getAttribute("data-size-key") as keyof ProductSizes;
    if (!sizeKey) return;
    sizePrice.original = parseFloat(sizes[sizeKey].price);
    if (sizes[sizeKey].discountPrice) {
      sizePrice.discounted = parseFloat(sizes[sizeKey].discountPrice);
    } else {
      sizePrice.discounted = 0;
    }
    calcPrice();
  });
  return sizeSelection;
}

function renderAdditives(additives: Additive[]) {
  const additivesSelection = createElement(
    "div",
    "modal__item__additives modal__item__info"
  );
  const additivesTitle = createElement(
    "p",
    "medium modal__item__select",
    "Additives"
  );
  const additiveButtons = createElement("div", "menu__item__buttons");

  const buttons = additives.map(AdditiveButton);
  additiveButtons.append(...buttons);
  additivesSelection.append(additivesTitle, additiveButtons);

  additiveButtons.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const button = e.target.closest(".button_option_additive");
    if (!button) return;

    button.classList.toggle("selected");

    const additive = additives.find(
      (additive) => additive.name === button.getAttribute("data-additive-name")
    );
    if (!additive) return;

    calcAdditivePrice(button, additive, additive.name);
  });

  return additivesSelection;
}

function renderPrice(price: ProductDetails["price"]) {
  const total = createElement(
    "div",
    "modal__item__total-price modal__item__info"
  );
  const text = createElement("h3", undefined, "Total:");
  const totalPrice = createElement("h3", "modal__item__price", `$${price}`);
  total.append(text, totalPrice);
  return total;
}

function calcPrice() {
  const totalPrice = {
    original: sizePrice.original + additivesPrice.original,
    discounted: sizePrice.discounted + additivesPrice.discounted,
  };
  const totalPriceNode = document.querySelector(".modal__item__price");
  if (totalPriceNode instanceof HTMLHeadingElement) {
    totalPriceNode.innerText = `$${totalPrice.original.toFixed(2)}`;
  }
  console.log(totalPrice);
  return totalPrice;
}

function calcAdditivePrice(
  button: Element,
  additive: Additive,
  additiveName: string
) {
  if (button.classList.contains("selected")) {
    if (additive.discountPrice) {
      additivesPrice.discounted += parseFloat(additive.discountPrice);
    }
    additivesPrice.original += parseFloat(additive.price);
    extras.push(additiveName);
  } else {
    if (additive.discountPrice) {
      additivesPrice.discounted -= parseFloat(additive.discountPrice);
    }
    additivesPrice.original -= parseFloat(additive.price);
    extras.splice(extras.indexOf(additiveName), 1);
  }
  console.log(additive)
  calcPrice();
  return additivesPrice;
}

function addToCartButtonHandler(product: ProductDetails) {
  const totalPrice = calcPrice();
  const cartItem: TCartItem = {
    id: product.id,
    name: product.name,
    categoty: product.category,
    size: selectedSize,
    extras,
    prise: totalPrice.original.toFixed(2),
    discountPrice: totalPrice.discounted.toFixed(2),
  };
  addToCart(cartItem);
  handleModal();
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isModalOpened) {
    handleModal();
  }
});
