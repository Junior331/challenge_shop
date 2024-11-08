import { httpRequest } from "@/app/utils/types";
import {
  AddNewProductProps,
  DeleteProductProps,
  fetchProductsProps,
} from "./@types";
import { AxiosError } from "axios";
import { cleanObjectWithZero, convertToParams } from "@/app/utils/utils";
import { ENDPOINTS } from "@/app/utils/endpoints";


export const fetchProducts = async ({
  order,
  sortBy,
  search,
  request,
  skip = 0,
  limit = 20,
}: fetchProductsProps) => {
  const params = convertToParams(cleanObjectWithZero({ limit, skip, order, sortBy, q: search}));

  const url = search
    ? `${ENDPOINTS.USER.PRODUCTS.GET_PRODUCTS}/search?${params}`
    : `${ENDPOINTS.USER.PRODUCTS.GET_PRODUCTS}?${params}`;

  const requestConfig: httpRequest = {
    url,
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

export const addNewProduct = async ({
  data,
  request,
  setLoading,
  setSnackbar,
  setOpenModalNewProduct,
}: AddNewProductProps) => {
  setLoading(true);

  const requestConfig: httpRequest = {
    url: `${ENDPOINTS.USER.PRODUCTS.POST_PRODUCT}/add`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  try {
    await request(requestConfig);

    setSnackbar({
      isOpen: true,
      severity: "success",
      vertical: "top",
      horizontal: "left",
      message: "Product successfully create!",
    });
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
    setOpenModalNewProduct(false);
  }
};

export const deleteProduct = async ({
  id,
  router,
  request,
  setLoading,
  setSnackbar,
  setOpenModalDelete,
}: DeleteProductProps) => {
  setLoading(true);

  const requestConfig: httpRequest = {
    url: `${ENDPOINTS.USER.PRODUCTS.DELETE_PRODUCT}/${id}`,
    method: "delete",
    headers: {},
    body: null,
  };

  try {
    await request(requestConfig);
    setSnackbar({
      isOpen: true,
      severity: "success",
      vertical: "top",
      horizontal: "left",
      message: "Product successfully deleted!",
    });
    return router.push("/pages/products");
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
    setOpenModalDelete(false);
  }
};
