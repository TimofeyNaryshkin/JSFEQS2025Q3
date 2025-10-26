export const userState = {
  isLoggedIn: true,
};

export const login = () => {
  userState.isLoggedIn = true;
};

export const logout = () => {
  userState.isLoggedIn = false;
}
