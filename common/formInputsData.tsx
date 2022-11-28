import { IFormInput } from "./interfaces";

export const formInputs: IFormInput[] = [
  {
    title: "Full Name",
    value: "",
    type: "text",
    errors: [],
    step: 1,
  },
  {
    title: "Birth Date",
    value: "",
    type: "date",
    errors: [],
    step: 2,
  },
];
