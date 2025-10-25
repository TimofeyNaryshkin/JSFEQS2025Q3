import type { Additive } from "../types/product";
import createElement from "../utils/create-element";

export const AdditiveButton = (additive: Additive, i: number) => {
  const button = createElement(
    "button",
    "button button_option button_option_additive action",
    additive.name
  );
  const icon = createElement("p", "button_option__icon", (i + 1).toString());
  button.append(icon);
  button.setAttribute("data-additive-name", additive.name);
  return button;
};
