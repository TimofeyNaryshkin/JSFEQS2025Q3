import { LanguagesObjType } from "./en";

export const ru: LanguagesObjType = {
  basic: {
    confirm: "Подтвердить",
    signIn: "Войти",
    registration: "Регистрация",
    signOut: "Выйти",
    main: "Главная",
    unexpectedError: "Произошла непредвиденная ошибка.",
    yes: "Да",
    no: "Нет",
    menu: "Меню",
    language: "Язык",
  },
  nav: {
    favCoffee: "Любимый кофе",
    about: "О нас",
    mobileApp: "Мобильное приложение",
    cta: "Свяжитесь с нами",
  },
  mainPage: {
    menu: "Меню",
    enjoyHeadingAcccent: "Наслаждайтесь",
    enjoyHeading: " премиальным кофе в нашем уютном кафе",
    enjoyText:
      "С гостеприимной атмосферой и восхитительным выбором кофе, Coffee House Resource — популярное место для любителей кофе и тех, кто ищет теплое и уютное пространство, чтобы насладиться любимым напитком.",
    chooseCoffeeHeading1: "Выберите свой ",
    chooseCoffeeHeadingAccent: "любимый",
    chooseCoffeeHeading2: " кофе",
    aboutHeadingAccent: "это идеальное и уютное место",
    aboutHeading1: "Resource — ",
    aboutHeading2:
      ", где вы можете насладиться разнообразными горячими напитками, расслабиться, встретиться с друзьями или поработать.",
    mobileAppHeading: " наше приложение, чтобы начать заказывать",
    mobileAppHeadingAccent: "Скачайте",
    mobileAppText:
      "Скачайте приложение Resource сегодня и почувствуйте комфорт заказа любимого кофе откуда угодно.",
    availableOn: "Доступно в",
  },
  footer: {
    footerHeading: "Пейте, наслаждайтесь, улыбайтесь.",
    footerHeadingAccent: "Время кофе!",
    address: "ул. Зеленая 8558, Лос-Анджелес",
    workingHours: "Пн-Сб: 9:00 – 23:00",
    cta: "Свяжитесь с нами",
  },
  menuPage: {
    menuHeading: "За каждой нашей чашкой скрывается ",
    menuHeadingAccent: "удивительный сюрприз",
    coffee: "Кофе",
    tea: "Чай",
    dessert: "Десерт",
  },
  modal: {
    size: "Размер",
    additives: "Добавки",
    total: "Итого",
    addToCart: "Добавить в корзину",
  },
  cartPage: {
    cartHeading: "Корзина",
    total: "Итого",
    address: "Адрес",
    payBy: "Оплата",
  },
  messages: {
    thxForOrder:
      "Спасибо за ваш заказ! Наш менеджер свяжется с вами в ближайшее время.",
    smthWentWrongReload: "Что-то пошло не так. Пожалуйста, обновите страницу",
    smthWentWrongTryAgain: "Что-то пошло не так. Пожалуйста, попробуйте снова",
  },
  auth: {
    placeholder: "Подсказка",
    registration: "Регистрация",
    signIn: "Войти",
    login: "Логин",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    city: "Город",
    street: "Улица",
    houseNumber: "Номер дома",
    payBy: "Оплата",
    cash: "Наличные",
    card: "Карта",
  },
  errorPage: {
    text: "Страница не найдена",
    link: "Перейти на главную",
  },
  validations: {
    invalid: "Неверный логин или пароль",
    loginRequired: "Введите логин",
    passwordRequired: "Введите пароль",
    cityRequired: "Введите город",
    streetRequired: "Введите улицу",
    houseRequired: "Введите номер дома",
    paymentRequired: "Выберите метод оплаты",
    confirmPasswordRequired: "Подтвердите пароль",
    login:
      "Логин должен содержать минимум 3 символа, начинаться с буквы и содержать только латинские буквы и цифры",
    password:
      "Пароль должен содержать минимум 6 символов и хотя бы один специальный символ (!@#$%^&*=)",
    passwordsMustMatch: "Пароли должны совпадать",
    house: "Номер дома должен быть положительным числом",
  },
  errors: {
    readError: "Hе удалось загрузить данные",
    saveError: "Не удалось сохранить данные",
    deleteError: "Не удалось удалить данные",
  },
};
