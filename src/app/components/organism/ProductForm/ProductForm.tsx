"use client";

import { useState } from "react";
import { Input } from "../../elements";
import { ProductFormProps } from "./@types";
import { handleBlur, handleDiscountBlur, handleDiscountFocus, handleDiscountInputChange, handleFocus, handleInputChange } from "./utils";

export const ProductForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  placeholders,
}: ProductFormProps) => {
  const [inputPriceValue, setInputPriceValue] = useState(values.price);
  const [inputDiscountValue, setInputDiscountValue] = useState(values.discount);

  return (
    <form
      method="dialog"
      onSubmit={handleSubmit}
      className="gap-2 w-full flex-wrap flex"
    >
      <Input
        type="text"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        helperText={errors.name}
        placeholder={placeholders?.name || "Type here..."}
        error={touched.name && Boolean(errors.name)}
      />
      <Input
        type="text"
        name="price"
        label="Price"
        value={inputPriceValue}
        helperText={errors.price}
        placeholder={placeholders?.price || "$0.00"}
        error={touched.price && Boolean(errors.price)}
        onChange={(e) =>
          handleInputChange({ event: e, handleChange, setInputPriceValue })
        }
        onBlur={() => handleBlur({ price: values.price, setInputPriceValue })}
        onFocus={() => handleFocus({ price: values.price, setInputPriceValue })}
      />
      <Input
        type="text"
        name="discount"
        label="Discount (%)"
        value={inputDiscountValue}
        helperText={errors.discount}
        placeholder={placeholders?.discount || "0%"}
        error={touched.discount && Boolean(errors.discount)}
        onChange={(e) =>
          handleDiscountInputChange({ event: e, handleChange, setInputDiscountValue })
        }
        onBlur={() => handleDiscountBlur({ discount: values.discount, setInputDiscountValue })}
        onFocus={() => handleDiscountFocus({ discount: values.discount, setInputDiscountValue })}
      />

      <Input
        type="text"
        name="inStock"
        label="In Stock"
        value={values.inStock}
        onChange={handleChange}
        helperText={errors.inStock}
        placeholder={placeholders?.inStock || "0"}
        error={touched.inStock && Boolean(errors.inStock)}
      />
    </form>
  );
};
