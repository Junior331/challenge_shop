import { formatter } from "@/app/utils/utils";
import {
  handleGenericProps,
  handleInputChangeProps,
  handleDiscountBlurProps,
  handleDiscountFocusProps,
  handleDiscountInputChangeProps,
} from "./@types";

export const handleInputChange = ({
  event,
  handleChange,
  setInputPriceValue,
}: handleInputChangeProps) => {
  handleChange(event);
  setInputPriceValue(event.target.value);
};

export const handleBlur = ({
  setInputPriceValue,
  price,
}: handleGenericProps) => {
  const formattedValue = formatter({
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(price || "0"));
  setInputPriceValue(formattedValue);
};

export const handleFocus = ({
  price,
  setInputPriceValue,
}: handleGenericProps) => {
  setInputPriceValue(price);
};

export const handleDiscountInputChange = ({
  event,
  handleChange,
  setInputDiscountValue,
}: handleDiscountInputChangeProps) => {
  const unformattedValue = event.target.value.replace(/[^\d.]/g, ""); 
  setInputDiscountValue(unformattedValue);
  handleChange(event); 
};

export const handleDiscountBlur = ({
  discount,
  setInputDiscountValue,
}: handleDiscountBlurProps) => {
  const formattedValue = `${parseFloat(discount || "0").toFixed(0)}%`;
  setInputDiscountValue(formattedValue);
};

export const handleDiscountFocus = ({
  discount,
  setInputDiscountValue,
}: handleDiscountFocusProps) => {
  const unformattedValue = discount.replace(/[^\d.]/g, "");
  setInputDiscountValue(unformattedValue);
};
