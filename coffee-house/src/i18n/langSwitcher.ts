import { en } from "../../messages/en";
import { ru } from "../../messages/ru";

export default function translate(locale: string) {
  switch (locale) {
    case "ru":
      return ru;
    default:
      return en;
  }
}
