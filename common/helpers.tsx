import { NextRouter } from "next/router";
import { LAST_REG_STEP, POKE_IMG_URL } from "./constants";
import { IFormInput } from "./interfaces";

export const validateInput = (formInput: IFormInput) => {
  const value = formInput.value;
  formInput.errors = [];

  if (formInput.validations.required) {
    if (value.length < 1) {
      formInput.errors.push(`${formInput.title} is required`);
    }
  }
  if (formInput.validations.pattern) {
    if (!value.match(formInput.validations.pattern.regex)) {
      formInput.errors.push(formInput.validations.pattern.errorMsg);
    }
  }
};

export const checkLocalStorageUserInfo = (router: NextRouter) => {
  //Check if the user finished the ragistration, if not-redirect accordingly to the last registration phase
  const registrationInfo: string | null =
    localStorage.getItem("registrationInfo");

  if (!registrationInfo) {
    router.push("/registration/step/1");
    return;
  }
  const parsedRegistrationInfo = JSON.parse(registrationInfo);

  if (parsedRegistrationInfo.length !== LAST_REG_STEP) {
    router.push(`/registration/step/${parsedRegistrationInfo.length + 1}`);
    return;
  }

  router.push("/");
};

export const computePokeImgSrc = (pokeId: string): string => {
  return `${POKE_IMG_URL}${pokeId}.png`;
};

export const computePokeId = (url: string): string => {
  const splitUrl = url.split("/");
  const pokeId = splitUrl[splitUrl.length - 2];
  return pokeId;
};

export const initialSetLocalStorage = (inputValue: string) => {
  localStorage.setItem(
    "registrationInfo",
    JSON.stringify([{ step: 1, value: inputValue }])
  );
};

export const updateLocalStorageInfo = (
  stepNumber: string | string[] | undefined,
  inputValue: string,
  parsedRegistrationInfo: { step: number; value: string }[]
) => {
  parsedRegistrationInfo.push({
    step: Number(stepNumber),
    value: inputValue,
  });
  localStorage.setItem(
    "registrationInfo",
    JSON.stringify(parsedRegistrationInfo)
  );
};
