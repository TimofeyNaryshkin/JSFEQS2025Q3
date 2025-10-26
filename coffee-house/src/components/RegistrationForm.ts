import data from "../select-options.json";
import { loginService } from "../services/auth-service";
import type { CityData, LoginData } from "../types/auth";
import { PLACEHOLDER, VALIDATION_RULES } from "../utils/constants";
import createElement from "../utils/create-element";
import { login } from "../utils/state";
import { SelectOption } from "./SelectOption";

const typedData: CityData = data;

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
  "medium message_invalid hidden",
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
const errorMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Incorrect login or password"
);

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

  const defaultCityOption = SelectOption("Select a city");
  defaultCityOption.defaultSelected = true;
  defaultCityOption.disabled = true;
  const defaultStreetOption = SelectOption("Select a street");
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
  cashRadio.type = "radio";
  cashRadio.defaultChecked = true;
  cardRadio.type = "radio";
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

  loginInput.addEventListener("blur", validateSignInForm);
  passwordInput.addEventListener("blur", validateSignInForm);
  loginInput.addEventListener("focus", resetLoginValidation);
  passwordInput.addEventListener("focus", resetPasswordValidation);
  registrationButton.addEventListener("click", (e) => {
    e.preventDefault();
    signin({ login: loginInput.value, password: passwordInput.value });
  });
  citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value as keyof CityData;
    const streets = typedData[selectedCity];

    if (streets) {
      const streetOptions = streets.map(SelectOption);
      streetSelect.replaceChildren(defaultStreetOption, ...streetOptions);
    }
  });
};

const validateSignInForm = () => {
  if (loginInput.value && !loginInput.validity.valid) {
    showLoginValidationMessage();
  }
  if (passwordInput.value && !passwordInput.validity.valid) {
    showPasswordValidationMessage();
  }
  registrationButton.disabled =
    !loginInput.value ||
    !loginInput.validity.valid ||
    !passwordInput.value ||
    !passwordInput.validity.valid;
};

const resetLoginValidation = () => {
  loginInput.classList.remove("invalid");
  loginMessage.classList.add("hidden");
};

const resetPasswordValidation = () => {
  passwordInput.classList.remove("invalid");
  passwordMessage.classList.add("hidden");
};

const showLoginValidationMessage = () => {
  loginInput.classList.add("invalid");
  loginMessage.classList.remove("hidden");
};

const showPasswordValidationMessage = () => {
  passwordInput.classList.add("invalid");
  passwordMessage.classList.remove("hidden");
};

const signin = async (loginData: LoginData) => {
  errorMessage.classList.add("hidden");
  const data = await loginService(loginData);
  if (!data) {
    showErrorMessage();
    return;
  }
  login();
  window.location.replace("./menu.html");
};

const showErrorMessage = () => {
  errorMessage.classList.remove("hidden");
};
