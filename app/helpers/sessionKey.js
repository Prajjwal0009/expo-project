//@ts-nocheck
//  set session key
export function setKey(key, value) {
  window.sessionStorage.setItem(key, value);
}

//  get value from session storage
export const getLocalKey = (key) => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem(key)) return localStorage.getItem(key);
  return false;
};

//  set session key
export function setLocalKey(key, value) {
  window.localStorage.setItem(key, value);
}

//  get value from session storage
export const getKey = (key) => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  } else {
    return false;
  }
};

//  remove key from session storage
export const removeKey = (key) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

export const accessToken = () => {
  return getKey("token");
};


