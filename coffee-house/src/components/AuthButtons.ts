import createElement from "../utils/create-element";

export const AuthButtons = () => {
  const container = createElement("div", "auth-buttons");
  const signInButton = createElement(
    "a",
    "button action button_auth",
    "Sign In"
  );
  const registrationButton = createElement(
    "a",
    "button action button_auth",
    "Registration"
  );
  signInButton.setAttribute("href", "./signin.html");
  registrationButton.setAttribute("href", "./registration.html");
  container.append(signInButton, registrationButton);
  return container;
};
