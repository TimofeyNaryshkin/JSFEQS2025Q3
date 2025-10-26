import { Cart, CartButton } from "./components/Cart";
import { Menu } from "./components/Menu";
import { RegistrationForm } from "./components/RegistrationForm";
import { SignInForm } from "./components/SignInForm";
import { Slider } from "./components/Slider";
import "./sass/style.scss";

await Slider();
await Menu();
CartButton();
Cart();
SignInForm();
RegistrationForm();
