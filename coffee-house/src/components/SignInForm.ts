import { loginService } from "../services/auth-service";
import type { LoginData } from "../types/auth";
import { PLACEHOLDER, VALIDATION_RULES } from "../utils/constants";
import createElement from "../utils/create-element";
import { login } from "../utils/state";
import { handleLogin } from "./Cart";

const loginInput = createElement("input", "input input_login medium");
const passwordInput = createElement("input", "input input_password medium");
const signInButton = createElement(
  "button",
  "button action button_auth button_signin",
  "Sign In"
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

const errorMessage = createElement(
  "p",
  "medium message_invalid hidden",
  "Incorrect login or password"
);

export const SignInForm = () => {
  const signinWrapper =
    document.querySelector<HTMLDivElement>(".signin-wrapper");
  const heading = createElement("h2", undefined, "Sign In");
  const form = createElement("form", "signin__form");
  const loginLabel = createElement("label", "label medium", "Login");
  const passwordLabel = createElement("label", "label medium", "Password");
  loginInput.placeholder = PLACEHOLDER;
  passwordInput.placeholder = PLACEHOLDER;
  passwordInput.type = "password";
  signInButton.disabled = true;

  loginLabel.append(loginInput, loginMessage);
  passwordLabel.append(passwordInput, passwordMessage);
  form.append(loginLabel, passwordLabel, signInButton, errorMessage);
  signinWrapper?.append(heading, form);

  loginInput.pattern = VALIDATION_RULES.loginPattern;
  passwordInput.pattern = VALIDATION_RULES.passwordPattern;

  loginInput.addEventListener("blur", validateSignInForm);
  passwordInput.addEventListener("blur", validateSignInForm);
  loginInput.addEventListener("focus", resetLoginValidation);
  passwordInput.addEventListener("focus", resetPasswordValidation);
  signInButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await signin({ login: loginInput.value, password: passwordInput.value });
  });
};

const validateSignInForm = () => {
  if (loginInput.value && !loginInput.validity.valid) {
    showLoginValidationMessage();
  }
  if (passwordInput.value && !passwordInput.validity.valid) {
    showPasswordValidationMessage();
  }
  signInButton.disabled =
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
  const response = await loginService(loginData);
  if (!response?.data || response.error) {
    showErrorMessage();
    return;
  }
  login(response?.data);
  handleLogin();
  window.location.replace("./menu.html");
};

const showErrorMessage = () => {
  errorMessage.classList.remove("hidden");
};
