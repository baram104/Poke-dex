import { IFormInput } from "./interfaces";

export const formInputs: IFormInput[] = [
  {
    title: "Full Name",
    value: "",
    validations: {
      required: true,
      pattern: {
        regex: /^[a-zA-Z]+ [a-zA-Z]+$/,
        errorMsg: "Both first and last name must contain only letters",
      },
    },
    type: "text",
    errors: [],
    step: 1,
  },
  {
    title: "Birth Date",
    value: "",
    validations: {
      required: true,
    },
    type: "date",
    errors: [],
    step: 2,
  },
];
