import Form from "../../../Components/Form";
import { formInputs } from "../../../common/formInputsData";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import {
  checkLocalStorageUserInfo,
  initialSetLocalStorage,
  updateLocalStorageInfo,
} from "../../../common/helpers";
import { IFormInput } from "../../../common/interfaces";
import { LAST_REG_STEP } from "../../../common/constants";

export default function RegistrationStep() {
  const router = useRouter();

  useEffect(() => {
    checkLocalStorageUserInfo(router);
  }, []);

  const { stepNumber } = router.query;

  const onSubmit = (inputValue: string): void => {
    const registrationInfo = localStorage.getItem("registrationInfo");

    if (!registrationInfo) {
      initialSetLocalStorage(inputValue);
      router.push("/registration/step/2");
    } else {
      const parsedRegistrationInfo = JSON.parse(registrationInfo);
      updateLocalStorageInfo(stepNumber, inputValue, parsedRegistrationInfo);

      if (parsedRegistrationInfo.length === LAST_REG_STEP) {
        router.push("/");
        return;
      }

      router.push(`/registration/step/${Number(stepNumber) + 1}`);
    }
  };

  const stepFormInput: IFormInput | undefined = formInputs.find(
    (formInput) => formInput.step === Number(stepNumber)
  );

  return (
    <>
      {stepFormInput && (
        <Form onSubmit={onSubmit} formInput={stepFormInput}></Form>
      )}
    </>
  );
}
