export const userState = {
  isLoggedIn: false,
};

export const login = () => {
  userState.isLoggedIn = true;
};

export const logout = () => {
  userState.isLoggedIn = false;
}
