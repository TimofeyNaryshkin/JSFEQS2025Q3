import { ERROR_MSG } from "../utils/constants";
import createElement from "../utils/create-element";

export const ErrorNotification = () => {
  const errorNotification = createElement("div", "error-notification");
  const errorText = createElement("h3", "error-notification__text", ERROR_MSG);
  errorNotification.append(errorText);
  errorNotification.addEventListener("animationend", () => {
    errorNotification.classList.remove("visible");
    errorNotification.remove();
  });
  return errorNotification;
};
