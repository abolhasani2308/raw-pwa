//@ts-nocheck
export namespace Is {
  export const email = (str?: string) => {
    const regEx = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    return !!str && regEx.test(String(str).toLowerCase());
  };

  export const nationalCode = (str?: string) => {
    if (!/^\d{10}$/.test(str)) return false;
    const check = +str[9];
    const sum =
      str
        .split('')
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
  };

  export const phoneNumber = (str?: string) => {
    const regEx = new RegExp('^(\\+98|0)?9\\d{9}$');
    return !!str && regEx.test(str);
  };

  export const password = (str: string) => {
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
    return (
      lowerCaseRegex.test(str) &&
      upperCaseRegex.test(str) &&
      numberRegex.test(str) &&
      specialCharacterRegex.test(str) &&
      str?.length >= 8
    );
  };

  export const referral = (str?: string) => {
    const regEx = new RegExp(/^[0-9]{8}$/);
    return !!str && regEx.test(str);
  };

  export const authenticator = (str?: string) => {
    const regEx = new RegExp(/^[0-9]{6}$/);
    return !!str && regEx.test(str);
  };

  export const emailConfirm = (str?: string) => {
    const regEx = new RegExp(/^[0-9]{6}$/);
    return !!str && regEx.test(str);
  };

  export const number = (str?: string) => {
    const regEx = new RegExp(/^[0-9]*\.?[0-9]*$/);
    return !!str && regEx.test(str);
  };

  export const sheba = (str?: string) => {
    const regEx = new RegExp(/^(?:(i|I)(r|R))(?=.{24}$)[0-9]*$/);
    return !!str && regEx.test(str);
  };

  export const name = (str?: string) => {
    const regEx = new RegExp(/^[\u0600-\u06ee\s]+$/);
    return !!str && regEx.test(str);
  };

  export const addressOrTag = (str?: string, regex?: string) => {
    const regEx = new RegExp(regex);
    return !!str && regEx.test(str);
  };
}
