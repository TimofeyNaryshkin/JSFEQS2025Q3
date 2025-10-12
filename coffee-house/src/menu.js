import data from "./products.json" with { type: "json" };

//category selecion

const categories = ["coffee", "tea", "desserts"];
let selectedCategory = "coffee";

const menu = document.querySelector(".menu-wrapper");
const categoriesContainer = document.querySelector(".menu__categories");
const categoryButtons = document.querySelectorAll(".button_category");
const menuItemsContainer = document.querySelector(".menu__items");

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

//menu items rendering

const limit = 4 
const screenWidth = 768;
let isLoaded = false;

function renderMenuItems(category) {
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

//menu item modal

let isModalOpened = false

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.append(overlay);

function handleModal() {
  isModalOpened = !isModalOpened;
  overlay.classList.toggle('opened', isModalOpened)
  document.body.classList.toggle('no-scroll', isModalOpened)
}

overlay.addEventListener('click', (e) => {
  if (!e.target.classList.contains('overlay')) return
  handleModal()
})

function openModal(item, img) {
  overlay.innerHTML = "";
  handleModal()
  
  const modalContent = document.createElement("div");
  modalContent.className = "modal__content";
  const closeButton = document.createElement("button");
  
  closeButton.className = "button button_modal_close action";
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", handleModal);
  
  const text = document.createElement("div");
  text.className = "modal__content__text";
  const title = document.createElement("h3");
  title.innerText = item.name ;

  const desc = document.createElement('p')
  desc.className = 'medium desc'
  desc.innerText = item.description

  const caption = document.createElement('p')
  caption.className = 'caption modal__item__info'
  caption.innerText = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.'
  const captionIcon = document.createElement('div')
  captionIcon.className = 'caption__icon'
  caption.append(captionIcon)

  text.append(title, desc, renderSizes(item.sizes), renderAdditives(item.additives), renderPrice(item.price), caption, closeButton)
  modalContent.append(img, text)
  overlay.append(modalContent)
}

let originalPrice
let sizePrice = 0
let additivesPrice = 0

function renderSizes(sizes) {
  const sizeSelection = document.createElement('div')
  sizeSelection.className = 'modal__item__size modal__item__info'
  const sizeTitle = document.createElement('p')
  sizeTitle.className = 'medium modal__item__select'
  sizeTitle.innerText = 'Size'
  const sizeButtons = document.createElement('div')
  sizeButtons.className = 'menu__item__buttons'
  const buttons = Object.entries(sizes).map((size, i) => {
    const button = document.createElement('button')
    button.className = 'button button_option button_option_size action'
    const icon = document.createElement('p')
    icon.className = 'button_option__icon'

    if (i === 0) {
      button.classList.add('selected')
    }

    icon.innerText = size[0].toUpperCase()
    button.innerText = `${size[1].size}`
    button.append(icon)
    return button
  })
  sizeButtons.append(...buttons)
  sizeSelection.append(sizeTitle, sizeButtons)

  sizeButtons.addEventListener('click', (e) => {
    const button = e.target.closest('.button_option_size')
    if (!button) return

    buttons.forEach((b) => b.classList.remove('selected'))
    button.classList.add('selected')
    
    if (button.lastChild.innerText === 'M') {
      sizePrice = 0.5
    } else if (button.lastChild.innerText === 'L') {
      sizePrice = 1
    } else {
      sizePrice = 0
    }

    calcPrice()
  })
  return sizeSelection
}

function renderAdditives(additives) {
  const additivesSelection = document.createElement('div')
  additivesSelection.className = 'modal__item__additives modal__item__info'
  const additivesTitle = document.createElement('p')
  additivesTitle.className = 'medium modal__item__select'
  additivesTitle.innerText = 'Additives'
  const additiveButtons = document.createElement('div')
  additiveButtons.className = 'menu__item__buttons'
  const buttons = additives.map((additive, i) => {
    const button = document.createElement('button')
    button.className = 'button button_option button_option_additive action'
    const icon = document.createElement('p')
    icon.className = 'button_option__icon'
    icon.innerText = (i + 1).toString()
    button.innerText = `${additive.name}`
    button.append(icon)
    return button
  })
  additiveButtons.append(...buttons)
  additivesSelection.append(additivesTitle, additiveButtons)

  additiveButtons.addEventListener('click', (e) => {
    const button = e.target.closest('.button_option_additive')
    if (!button) return
    
    button.classList.toggle('selected')
    if (button.classList.contains('selected')) {
      additivesPrice += 0.5
    } else {
      additivesPrice -= 0.5
    }
    calcPrice()
  })

  return additivesSelection
}

function renderPrice(price) {
  const total = document.createElement('div')
  total.className = 'modal__item__total-price modal__item__info'
  const text = document.createElement('h3')
  text.innerText = 'Total:'
  const totalPrice = document.createElement('h3')
  totalPrice.className = 'modal__item__price'
  totalPrice.innerText = `$${price}`
  total.append(text, totalPrice)
  originalPrice = parseFloat(price)
  return total
}

function calcPrice() {
  const totalPrice = originalPrice + sizePrice + additivesPrice;
  document.querySelector('.modal__item__price').innerText = `$${totalPrice.toFixed(2, 0)}`
}

menuItemsContainer.addEventListener('click', (e) => {
  const card = e.target.closest(".menu__item");
  if (!card) return
  const details = data.find((item) => item.name === card.lastChild.firstChild.innerText)
  const img = card.firstChild.cloneNode()
  openModal(details, img)
})