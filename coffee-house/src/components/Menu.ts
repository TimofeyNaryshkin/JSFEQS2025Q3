import { productsService } from "../services/product-service";
import type { Product } from "../types/product";
import { ERROR_MSG } from "../utils/constants";
import createElement from "../utils/create-element";
import { userState } from "../utils/state";
import Loader from "./Loader";
import { MenuItem } from "./MenuItem";
import { openModal } from "./Modal";

let selectedCategory = "coffee";
let productsCache: Product[] = [];
const limit = 4;
const screenWidth = 768;
let isLoaded = false;
let resizeTimeout: number;

const menuWrapper = document.querySelector<HTMLDivElement>(".menu-wrapper");
const menuItemsContainer =
  document.querySelector<HTMLDivElement>(".menu__items");
const categoriesContainer =
  document.querySelector<HTMLDivElement>(".menu__categories");
const categoryButtons =
  document.querySelectorAll<HTMLButtonElement>(".button_category");

export const Menu = async () => {
  const loader = Loader();
  menuWrapper?.append(loader);

  const products = await productsService();

  loader.remove();

  if (products && products.length) {
    productsCache = products;
    renderMenuItems();
    attachEventListeners();
  } else {
    categoriesContainer?.replaceWith(
      createElement("h3", "slider__error", ERROR_MSG)
    );
  }
};

function selectCategory(e: Event) {
  if (!(e.target instanceof HTMLElement)) return;
  const button: HTMLButtonElement | null = e.target.closest(".button_category");
  if (button) {
    selectedCategory = button.innerText.toLowerCase();
    categoryButtons.forEach((btn) => {
      btn.classList.toggle(
        "button_category_active",
        btn.innerText.toLowerCase() === selectedCategory
      );
    });
    isLoaded = false;
    renderMenuItems();
  }
}

function renderMenuItems() {
  if (!menuWrapper || !menuItemsContainer) return;

  const loadMoreButton = document.querySelector(".button_load-more");
  if (loadMoreButton) {
    loadMoreButton.remove();
  }

  const items = productsCache.filter(
    (product) => product.category === selectedCategory
  );
  const menuItems = items.map(MenuItem);

  if (
    menuItems.length > limit &&
    window.innerWidth <= screenWidth &&
    !isLoaded
  ) {
    menuItemsContainer.replaceChildren(...menuItems.slice(0, limit));
    const loadMoreButton = createElement("button", "button button_load-more");
    menuWrapper.append(loadMoreButton);
    loadMoreButton.addEventListener("click", () => {
      loadMoreButton.classList.add("loading");
    });
    loadMoreButton.addEventListener("animationend", () => {
      loadMoreButton.remove();
      menuItemsContainer.append(...menuItems.slice(limit));
    });
    isLoaded = true;
  } else {
    menuItemsContainer.replaceChildren(...menuItems);
    isLoaded = false;
  }
  handlePrices();
}

function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    isLoaded = false;
    renderMenuItems();
  }, 250);
}

function attachEventListeners() {
  if (!categoriesContainer || !menuItemsContainer) return;
  categoriesContainer.addEventListener("click", selectCategory);
  window.addEventListener("resize", handleResize);
  menuItemsContainer.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const item = e.target.closest(".menu__item");
    if (!item || !item.firstChild) return;
    const itemId = item.getAttribute("data-id");
    if (!itemId) return;
    const img = item.firstChild.cloneNode();
    openModal(itemId, img);
  });
}

function handlePrices() {
  const userString = userState();
  if (userString === null) return;
  const menuItemPrices = document.querySelectorAll(".menu__item__price");
  menuItemPrices.forEach((el) => {
    if (el.firstElementChild?.textContent && el.lastElementChild) {
      el.firstElementChild.classList.toggle("hidden", !userString);
      el.lastElementChild.classList.toggle("line-through", !!userString);
    }
  });
}
