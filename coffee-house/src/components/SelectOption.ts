import createElement from "../utils/create-element"

export const SelectOption = (value: string) => {
  const option = createElement('option', 'option')
  option.value = value
  option.textContent = value
  return option
}