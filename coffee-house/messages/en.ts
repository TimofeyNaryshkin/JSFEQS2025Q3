export const en = {
  basic: {
    confirm: "Confirm",
    signIn: "Sign In",
    registration: "Registration",
    signOut: "Sign Out",
    main: "Main",
    unexpectedError: "An unexpected error occurred.",
    yes: "Yes",
    no: "No",
    menu: "Menu",
    language: "Language",
  },
  nav: {
    favCoffee: "Favorite coffee",
    about: "About",
    mobileApp: "Mobile app",
    cta: "Contact us",
  },
  mainPage: {
    menu: "Menu",
    enjoyHeading: " premium coffee at our charming cafe",
    enjoyHeadingAcccent: "Enjoy",
    enjoyText:
      "With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage. ",
    chooseCoffeeHeading1: "Choose your ",
    chooseCoffeeHeadingAccent: "favorite",
    chooseCoffeeHeading2: " coffee",
    aboutHeadingAccent: "the perfect and cozy place",
    aboutHeading1: "Resource is ",
    aboutHeading2:
      " where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.",
    mobileAppHeading: " our apps to start ordering",
    mobileAppHeadingAccent: "Download",
    mobileAppText:
      "Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are ",
    availableOn: "Available on",
  },
  footer: {
    footerHeading: "Sip, Savor, Smile.",
    footerHeadingAccent: "It’s coffee time!",
    address: "8558 Green Rd., LA ",
    workingHours: "Mon-Sat: 9:00 AM – 23:00 PM",
    cta: "Contact us",
  },
  menuPage: {
    menuHeading: "Behind each of our cups hides an ",
    menuHeadingAccent: "amazing surprise",
    coffee: "Coffee",
    tea: "Tea",
    dessert: "Dessert",
  },
  modal: {
    size: "Size",
    additives: "Additives",
    total: "Total",
    addToCart: "Add to cart",
  },
  cartPage: {
    cartHeading: "Cart",
    total: "Total",
    address: "Address",
    payBy: "Pay by",
  },
  messages: {
    thxForOrder:
      "Thank you for your order! Our manager will contact you shortly.",
    smthWentWrongReload: "Something went wrong. Please, refresh the page",
    smthWentWrongTryAgain: "Something went wrong. Please, try again",
  },
  auth: {
    placeholder: "Placeholder",
    registration: "Registration",
    signIn: "Sign In",
    login: "Login",
    password: "Password",
    confirmPassword: "Confirm password",
    city: "City",
    street: "Street",
    houseNumber: "House number",
    payBy: "Pay by",
    cash: "Cash",
    card: "Card",
  },
  errorPage: {
    text: "Page Not Found",
    link: "Go to Main",
  },
  validations: {
    invalid: "Incorrect login or password",
    loginRequired: "Please enter your login",
    passwordRequired: "Please enter your password",
    cityRequired: "Please select your city",
    streetRequired: "Please select your street",
    houseRequired: "Please enter your house number",
    paymentRequired: "Please choose your payment method",
    confirmPasswordRequired: "Please comfirm your password",
    login:
      "Login must be at least 3 characters, start with a letter, and contain only letters and numbers",
    password:
      "Password must be at least 6 characters and contain at least one special character (!@#$%^&*=)",
    passwordsMustMatch: "Passwords must match",
    house: 'House number must be a positive number'
  },
  errors: {
    readError: "Failed to load data",
    saveError: "Failed to save data",
    deleteError: "Failed to delete data",
  },
};

export type LanguagesObjType = typeof en;
