import { SUCCESS_MSG } from "../utils/constants";
import createElement from "../utils/create-element";

export const SuccessNotification = () => {
  const errorNotification = createElement("div", "notification notification_success");
  const errorText = createElement("h3", undefined, SUCCESS_MSG);
  errorNotification.append(errorText);
  errorNotification.addEventListener("animationend", () => {
    errorNotification.classList.remove("visible");
    errorNotification.remove();
  });
  return errorNotification;
};
