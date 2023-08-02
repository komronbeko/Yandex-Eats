export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access-token");
};

export const setAccessTokenToLocalStorage = (token) => {
  return localStorage.setItem("access-token", token);
};

export const getCodeFromStorage = () => {
  return localStorage.getItem("code");
};

export const setCodeToStorage = (code) => {
  return localStorage.setItem("code", code);
};

export const getEmailFromStorage = () => {
  return localStorage.getItem("email");
};

export const setEmailToStorage = (email) => {
  return localStorage.setItem("email", email);
};
