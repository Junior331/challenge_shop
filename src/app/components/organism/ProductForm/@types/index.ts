import { FormikErrors, FormikTouched } from "formik";
import {
  Dispatch,
  ChangeEvent,
  SetStateAction,
  ChangeEventHandler,
} from "react";

export type valuesForm = {
  name: string;
  price: string;
  inStock: string;
  discount: string;
};
export type ProductFormProps = {
  values: valuesForm;
  placeholders?: valuesForm;
  errors: FormikErrors<valuesForm>;
  touched: FormikTouched<valuesForm>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
};
export type handleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  setInputPriceValue: Dispatch<SetStateAction<string>>;
};
export type handleGenericProps = {
  price: string;
  setInputPriceValue: Dispatch<SetStateAction<string>>;
};

export type handleDiscountInputChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInputDiscountValue: React.Dispatch<React.SetStateAction<string>>;
};
export type handleDiscountBlurProps = {
  discount: string;
  setInputDiscountValue: React.Dispatch<React.SetStateAction<string>>;
};
export type handleDiscountFocusProps = {
  discount: string;
  setInputDiscountValue: React.Dispatch<React.SetStateAction<string>>;
};
