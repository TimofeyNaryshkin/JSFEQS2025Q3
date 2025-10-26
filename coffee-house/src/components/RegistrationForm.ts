import data from "../select-options.json";
import { registrationService } from "../services/auth-service";
import type { CityData, RegistrationData } from "../types/auth";
import { PLACEHOLDER, VALIDATION_RULES } from "../utils/constants";
import createElement from "../utils/create-element";
import { login } from "../utils/state";
import { SelectOption } from "./SelectOption";

const typedData: CityData = data;
let paymentMethod = "cash";

const loginInput = createElement("input", "input input_login medium");
const passwordInput = createElement("input", "input input_password medium");
const confirmPasswordInput = createElement(
  "input",
  "input input_password medium"
);
const citySelect = createElement(
  "select",
  "select input select_city input_short medium"
);
const streetSelect = createElement(
  "select",
  "select input select_street input_short medium"
);
const houseInput = createElement(
  "input",
  "input input_house input_short medium"
);
const cashRadio = createElement("input", "input input_radio medium");
const cardRadio = createElement("input", "input input_radio medium");
const registrationButton = createElement(
  "button",
  "button action button_auth button_signin button_registration",
  "Registration"
);

const loginMessage = createElement(
  "p",
  "medium message_invalid  hidden",
  "Invalid login"
);
const passwordMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Invalid password"
);
const confirmPasswordMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Passwords must match"
);
const cityMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Please select city"
);
const streetMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Please select city"
);
const houseMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Invalid house number"
);
const errorMessage = createElement("p", "medium message_invalid hidden");

export const RegistrationForm = () => {
  const registrationWrapper = document.querySelector<HTMLDivElement>(
    ".registration-wrapper"
  );
  const heading = createElement("h2", undefined, "Registration");
  const form = createElement("form", "registration__form");
  const loginLabel = createElement(
    "label",
    "label_login label medium",
    "Login"
  );
  const passwordLabel = createElement("label", "label medium", "Password");
  const confirmPasswordLabel = createElement(
    "label",
    "label medium",
    "Confirm Password"
  );
  const cityLabel = createElement("label", "label medium", "City");
  const streetLabel = createElement("label", "label medium", "Street");
  const houseLabel = createElement("label", "label medium", "House number");
  const payByLabel = createElement(
    "label",
    "label label_pay-by medium",
    "Pay by"
  );
  const radioContainer = createElement("div", "radio-container");
  const cashLabel = createElement("label", "label label_radio medium", "Cash");
  const cardLabel = createElement("label", "label label_radio medium", "Card");

  const defaultCityOption = SelectOption(PLACEHOLDER);
  defaultCityOption.defaultSelected = true;
  defaultCityOption.disabled = true;
  const defaultStreetOption = SelectOption(PLACEHOLDER);
  defaultStreetOption.defaultSelected = true;
  defaultStreetOption.disabled = true;
  const cityOptions = Object.keys(data).map(SelectOption);
  citySelect.append(defaultCityOption, ...cityOptions);
  streetSelect.append(defaultStreetOption);

  loginInput.placeholder = PLACEHOLDER;
  passwordInput.placeholder = PLACEHOLDER;
  confirmPasswordInput.placeholder = PLACEHOLDER;
  houseInput.placeholder = PLACEHOLDER;
  passwordInput.type = "password";
  confirmPasswordInput.type = "password";
  houseInput.type = "number";
  houseInput.min = "1";
  cashRadio.type = "radio";
  cashRadio.value = "cash";
  cashRadio.defaultChecked = true;
  cardRadio.type = "radio";
  cardRadio.value = "card";
  cashRadio.name = "payBy";
  cardRadio.name = "payBy";
  registrationButton.disabled = true;

  loginLabel.append(loginInput, loginMessage);
  passwordLabel.append(passwordInput, passwordMessage);
  confirmPasswordLabel.append(confirmPasswordInput, confirmPasswordMessage);
  cityLabel.append(citySelect, cityMessage);
  streetLabel.append(streetSelect, streetMessage);
  houseLabel.append(houseInput, houseMessage);
  cashLabel.append(cashRadio);
  cardLabel.append(cardRadio);
  radioContainer.append(cashLabel, cardLabel);
  payByLabel.append(radioContainer);
  form.append(
    loginLabel,
    passwordLabel,
    confirmPasswordLabel,
    cityLabel,
    streetLabel,
    houseLabel,
    payByLabel,
    errorMessage
  );
  registrationWrapper?.append(heading, form, registrationButton);

  loginInput.pattern = VALIDATION_RULES.loginPattern;
  passwordInput.pattern = VALIDATION_RULES.passwordPattern;
  confirmPasswordInput.pattern = VALIDATION_RULES.passwordPattern;

  loginInput.addEventListener("blur", validateRegistrationForm);
  passwordInput.addEventListener("blur", validateRegistrationForm);
  confirmPasswordInput.addEventListener("blur", validateRegistrationForm);
  houseInput.addEventListener("blur", validateRegistrationForm);

  loginInput.addEventListener("focus", () =>
    resetValidation(loginInput, loginMessage)
  );
  passwordInput.addEventListener("focus", () =>
    resetValidation(passwordInput, passwordMessage)
  );
  confirmPasswordInput.addEventListener("focus", () =>
    resetValidation(confirmPasswordInput, confirmPasswordMessage)
  );

  registrationButton.addEventListener("click", (e) => {
    e.preventDefault();
    register({
      login: loginInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
      city: citySelect.value,
      street: streetSelect.value,
      houseNumber: +houseInput.value,
      paymentMethod,
    });
  });
  citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value as keyof CityData;
    const streets = typedData[selectedCity];

    if (streets) {
      const streetOptions = streets.map(SelectOption);
      streetSelect.replaceChildren(defaultStreetOption, ...streetOptions);
    }
    validateRegistrationForm();
  });
  streetSelect.addEventListener("change", validateRegistrationForm);

  houseInput.addEventListener("input", () => {
    houseInput.value = houseInput.value.replace(/[^0-9]/g, "");
  });
  cardRadio.addEventListener("change", () => {
    paymentMethod = cardRadio.value;
    validateRegistrationForm();
  });
  cashRadio.addEventListener("change", () => {
    paymentMethod = cashRadio.value;
    validateRegistrationForm();
  });
};

const validateRegistrationForm = () => {
  validateData(loginInput, loginMessage);
  validateData(passwordInput, passwordMessage);
  validateData(confirmPasswordInput, confirmPasswordMessage);
  validateData(citySelect, cityMessage);
  validateData(streetSelect, streetMessage);
  validateData(houseInput, houseMessage);

  registrationButton.disabled =
    !loginInput.value ||
    !loginInput.validity.valid ||
    !passwordInput.value ||
    !passwordInput.validity.valid ||
    !confirmPasswordInput.value ||
    !confirmPasswordInput.validity.valid ||
    !citySelect.value ||
    confirmPasswordInput.value !== passwordInput.value ||
    citySelect.value === PLACEHOLDER ||
    streetSelect.value == PLACEHOLDER ||
    !streetSelect.value ||
    !houseInput.value ||
    !houseInput.validity.valid;

  if (!registrationButton.disabled) {
    resetValidation(confirmPasswordInput, confirmPasswordMessage);
  }
};

const resetValidation = (element: Element, message: Element) => {
  element.classList.remove("invalid");
  message.classList.add("hidden");
};

const showValidationMessage = (element: Element, message: Element) => {
  element.classList.add("invalid");
  message.classList.remove("hidden");
};

const register = async (registrationData: RegistrationData) => {
  errorMessage.classList.add("hidden");
  const data = await registrationService(registrationData);
  if (data instanceof Error) {
    showErrorMessage(data.message);
    return;
  }
  if (data?.error) {
    showErrorMessage(data.error);
    return;
  }
  login();
  window.location.replace("./menu.html");
};

const showErrorMessage = (message: string) => {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
};

const validateData = (
  element: HTMLInputElement | HTMLSelectElement,
  message: Element
) => {
  if (element.value && !element.validity.valid) {
    showValidationMessage(element, message);
  }
  if (
    element === confirmPasswordInput &&
    element.value &&
    element.value !== passwordInput.value
  ) {
    showValidationMessage(element, message);
  }
};
