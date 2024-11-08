import * as yup from "yup";

export const productFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Invalid Name, must be 3 or more characters")
    .required("Mandatory name field"),
  price: yup
    .number()
    .typeError("Invalid value, must be a number")
    .min(1, "Invalid value, must be 1 or more")
    .required("Mandatory Price field"),
  inStock: yup
    .number()
    .typeError("Invalid value, must be a number")
    .min(1, "Invalid value, must be 1 or more")
    .required("Mandatory In Stock field"),
  discount: yup
    .number()
    .typeError("Invalid value, must be a number")
    .min(1, "Invalid value, must be 1 or more")
    .required("Mandatory Discount field"),
});
