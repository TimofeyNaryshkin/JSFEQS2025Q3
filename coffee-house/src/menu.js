import data from "./products.json" with { type: "json" };

const categories = ["coffee", "tea", "desserts"];
let selectedCategory = "coffee";

const menu = document.querySelector(".menu-wrapper");
const categoriesContainer = document.querySelector(".menu__categories");
const categoryButtons = document.querySelectorAll(".button_category");

function selectCategory(e) {
  const button = e.target.closest(".button_category");
  if (button) {
    selectedCategory = button.innerText.toLowerCase();
    categoryButtons.forEach((btn) => {
      btn.classList.toggle(
        "button_category_active",
        btn.innerText.toLowerCase() === selectedCategory
      );
    });
    isLoaded = false;
    renderMenuItems(selectedCategory);
  }
}

const limit = 4 
const screenWidth = 768;
let isLoaded = false;

function renderMenuItems(category) {
  const menuItemsContainer = document.querySelector(".menu__items");
  menuItemsContainer.innerHTML = "";

  const existingButton = menu.querySelector('.button_load-more');
  if (existingButton) {
    existingButton.remove();
  }

  const items = data.filter((item) => item.category === category);
  const cards = items.map((item, i) => createMenuItem(item,i))

  if (cards.length > limit && window.innerWidth <= screenWidth && !isLoaded) {
    menuItemsContainer.append(...cards.slice(0, limit));
    const loadMoreButton = document.createElement('button');
    loadMoreButton.className = 'button button_load-more';
    menu.append(loadMoreButton);
    loadMoreButton.addEventListener('click', () => {
      loadMoreButton.classList.add('loading');
    })
    loadMoreButton.addEventListener('animationend', () => {
      loadMoreButton.remove();
      menuItemsContainer.append(...cards.slice(limit));
    })
    isLoaded = true;
  } else {
    menuItemsContainer.append(...cards);
    isLoaded = false;
  }
}

let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    isLoaded = false;
    renderMenuItems(selectedCategory);
  }, 250);
}

function createMenuItem(item, i) {
  const card = document.createElement("div");
  card.className = "menu__item";
  const img = document.createElement("div");
  img.className = `menu__item__img ${item.category}_${i + 1}`;
  const text = document.createElement("div");
  text.className = "menu__item__text";
  const title = document.createElement("h3");
  title.innerText = item.name;
  const desc = document.createElement("p");
  desc.classList.add('medium');
  desc.innerText = item.description;
  const price = document.createElement("h3");
  price.innerText = `$${item.price}`;
  text.append(title, desc, price);
  card.append(img, text);
  return card
}

renderMenuItems(selectedCategory)
categoriesContainer.addEventListener("click",  selectCategory);
window.addEventListener("resize", handleResize);

