import { productByIdService } from "../services/product-service";
import type { Additive, ProductDetails, ProductSizes } from "../types/product";
import createElement from "../utils/create-element";
import { AdditiveButton } from "./AdditiveButton";
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
  addToCartButton.addEventListener("click", handleModal);
  const text = createElement("div", "modal__content__text");
  const title = createElement("h3", undefined, product.name);
  const description = createElement("p", "medium desc", product.description);

  sizePrice = parseFloat(product.price);

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

let sizePrice = 0;
let additivesPrice = 0;

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

  sizeButtons.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const button = e.target.closest(".button_option_size");
    if (!button) return;

    buttons.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");

    const sizeKey = button.getAttribute("data-size-key") as keyof ProductSizes;
    if (!sizeKey) return;
    sizePrice = parseFloat(sizes[sizeKey].price);

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
    const additiveName = button.getAttribute("data-additive-name");
    if (!additiveName) return;
    const additivePrice = additives.find(
      (additive) => additive.name === additiveName
    )?.price;
    if (!additivePrice) return;

    if (button.classList.contains("selected")) {
      additivesPrice += parseFloat(additivePrice);
    } else {
      additivesPrice -= parseFloat(additivePrice);
    }
    calcPrice();
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
  const totalPrice = sizePrice + additivesPrice;
  const totalPriceNode = document.querySelector(".modal__item__price");
  if (totalPriceNode instanceof HTMLHeadingElement) {
    totalPriceNode.innerText = `$${totalPrice.toFixed(2)}`;
  }
}
