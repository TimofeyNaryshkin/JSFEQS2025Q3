import createElement from "../utils/create-element"

const Loader = () => {
  const loader = createElement("div", "loader");
  const spinner = createElement("div", "spinner");
  loader.append(spinner);
  return loader;
}

export default Loader;