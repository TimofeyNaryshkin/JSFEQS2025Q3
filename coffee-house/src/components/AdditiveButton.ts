import type { Additive } from "../types/product";
import createElement from "../utils/create-element";
import { PriceTiiltip } from "./PriceTooltip";

export const AdditiveButton = (additive: Additive, i: number) => {
  const button = createElement(
    "button",
    "button button_option button_option_additive action",
    additive.name
  );
  const icon = createElement("p", "button_option__icon", (i + 1).toString());
  button.append(icon);
  button.setAttribute("data-additive-name", additive.name);
  const tootlip = PriceTiiltip(additive.price);
  button.addEventListener("mouseenter", () => {
    button.append(tootlip);
  });
  button.addEventListener("mouseleave", () => {
    tootlip.remove();
  });
  return button;
};
