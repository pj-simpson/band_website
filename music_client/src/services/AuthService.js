import axios from "axios";

export const getAccessToken = () => {
  const auth = JSON.parse(window.localStorage.getItem("jwt-auth"));
  if (auth) {
    return auth;
  }
  return undefined;
};
