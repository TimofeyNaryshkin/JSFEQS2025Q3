import type { Size } from "../types/product";
import createElement from "../utils/create-element";

export const SizeButton = (size: [string, Size], i: number) => {
  const button = createElement(
    "button",
    "button button_option button_option_size action"
  );
  const icon = createElement("p", "button_option__icon");

  if (i === 0) {
    button.classList.add("selected");
  }

  icon.innerText = size[0].toUpperCase();
  button.innerText = `${size[1].size}`;
  button.append(icon);
  button.setAttribute("data-size-key", size[0]);
  return button;
};
