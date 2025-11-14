export const isBrowser = () => typeof window !== "undefined";

export const getAccessToken = () =>
  isBrowser() && window.localStorage.getItem("accessToken")
    ? window.localStorage.getItem("accessToken")
    : "";

export const setAccessToken = (token: string) =>
  window.localStorage.setItem("accessToken", token);

export const removeAccessToken = () =>
  window.localStorage.removeItem("accessToken");

export const isLoggedIn = () => {
  const accessToken = getAccessToken();

  return !!accessToken;
};
