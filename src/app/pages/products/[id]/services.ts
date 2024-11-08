import { AxiosError } from "axios";

import { httpRequest } from "@/app/utils/types";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { fetchProductProps, UpdateProductProps } from "./@types";


export const fetchProduct = async ({ id, request }: fetchProductProps) => {
  const requestConfig: httpRequest = {
    url: `${ENDPOINTS.USER.PRODUCTS.GET_PRODUCT_DETAILS}/${id}`,
    method: "get",
    headers: {},
    body: null,
  };
  try {
    await request(requestConfig);
  } catch (e) {
    console.error(e);
  }
};

export const updateProduct = async ({
  id,
  data,
  request,
  setLoading,
  setSnackbar,
  setOpenModalEdit,
}: UpdateProductProps) => {
  setLoading(true);
  const requestConfig: httpRequest = {
    url: `${ENDPOINTS.USER.PRODUCTS.EDIT_PRODUCT}/${id}`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    await request(requestConfig);
    setSnackbar({
      isOpen: true,
      severity: "success",
      vertical: "top",
      horizontal: "left",
      message: "Product successfully updated!",
    });
    return setOpenModalEdit(false);
  } catch (error) {
    console.error("error ::", error);
    const _error = error as AxiosError<{ message: string }>;
    const errorMessage =
      _error.response?.data?.message || "An unexpected error occurred";

    setSnackbar({
      isOpen: true,
      severity: "error",
      vertical: "bottom",
      horizontal: "left",
      message: errorMessage,
    });
  } finally {
    setLoading(false);
  }
};
