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

export const getNameFromStorage = () => {
  return localStorage.getItem("name");
};

export const setNameToStorage = (name) => {
  return localStorage.setItem("name", name);
};

export const getPasswordFromStorage = () => {
  return localStorage.getItem("password");
};

export const setPasswordToStorage = (password) => {
  return localStorage.setItem("password", password);
};

export const getPhoneFromStorage = () => {
  return localStorage.getItem("phone");
};

export const setPhoneToStorage = (phone) => {
  return localStorage.setItem("phone", phone);
};