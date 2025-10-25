import data from "./products.json" with { type: "json" };

//category selecion



//menu item modal


//burger menu

const burgerButton = document.querySelector(".button_burger");
const nav = document.querySelector(".nav");
const menuButton = document.querySelector(".button_menu");

let isOpen = false;

function handleBurger() {
  isOpen = !isOpen;
  burgerButton.classList.toggle("button_burger_opened", isOpen);
  document.body.classList.toggle("no-scroll", isOpen);
  burgerMenu.classList.toggle("burger-menu_opened", isOpen);
}

const burgerMenu = document.createElement("div");
burgerMenu.className = "burger-menu";
burgerMenu.innerHTML = nav.innerHTML;
burgerMenu.append(menuButton.cloneNode(true));
document.body.append(burgerMenu);

burgerMenu.addEventListener("click", handleBurger);

burgerButton.addEventListener("click", handleBurger);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isOpen) {
    handleBurger();
  }
});