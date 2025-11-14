export const isBrowser = () => typeof window !== "undefined";

export const getAccessToken = () =>
  isBrowser() && window.localStorage.getItem("accessToken")
    ? window.localStorage.getItem("accessToken")
    : "";

const setAccessToken = (token: string) =>
  window.localStorage.setItem("accessToken", token);

export const isLoggedIn = () => {
  const accessToken = getAccessToken();

  return !!accessToken;
};
