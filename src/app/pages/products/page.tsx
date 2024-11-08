"use client";

import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { icons } from "@/app/assets/icons";
import { SearchContext } from "@/app/contexts/Search";
import { GenericModal } from "@/app/components/modules";
import { SnackbarContext } from "@/app/contexts/Snackbar";
import { useAxiosRequest } from "@/app/hooks/axiosAdapter";
import { Button, Select } from "@/app/components/elements";
import { addNewProduct, deleteProduct, fetchProducts } from "./services";
import { itemPerPageOptions, orderOptions, sortByOptions } from "./utils";
import { CardProduct, ProductForm, Layout } from "@/app/components/organism";
import { Product, ProductSummary, ProductsResponse } from "@/app/utils/types";
import { productFormSchema } from "@/app/components/organism/ProductForm/schema";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { setSnackbar } = useContext(SnackbarContext);
  const { contentActive } = useContext(SearchContext);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const { request: requestProduct } = useAxiosRequest<Product>();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [orderSelected, setOrderSelected] = useState<string>("");
  const [sortBySelected, setSortBySelected] = useState<string>("");
  const [productSelected, setProductSelected] = useState<Product>();
  const { response, request } = useAxiosRequest<ProductsResponse>();
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false);
  const skip = (currentPage - 1) * productsPerPage;

  const fetchPageData = async () => {
    await fetchProducts({
      request,
      skip: skip,
      order: orderSelected,
      search: contentActive,
      sortBy: sortBySelected,
      limit: productsPerPage,
    });
  };

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);

  const handleConfirmDelete = () => {
    try {
      deleteProduct({
        router,
        setLoading,
        setSnackbar,
        setOpenModalDelete,
        request: requestProduct,
        id: productSelected?.id.toString() as string,
      });
    } catch (error) {
      console.error("error ::", error);
      setSnackbar({
        isOpen: true,
        severity: "error",
        vertical: "bottom",
        horizontal: "left",
        message: "An unexpected error occurred",
      });
    } finally {
      fetchPageData();
    }
  };

  const goToPreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      inStock: "",
      discount: "",
    },
    onSubmit: async ({ name, price, inStock, discount }) => {
      const body: ProductSummary = {
        title: name,
        price: Number(price),
        stock: Number(inStock),
        discountPercentage: Number(discount),
      };
      await addNewProduct({
        data: body,
        setLoading,
        setSnackbar,
        setOpenModalNewProduct,
        request: requestProduct,
      });
    },
    validationSchema: productFormSchema,
  });

  const { values, touched, errors, handleSubmit, handleChange } = formik;

  useEffect(() => {
    fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    contentActive,
    orderSelected,
    sortBySelected,
    productsPerPage,
  ]);

  return (
    <Layout>
      <div className="flex w-screen items-end justify-between flex-wrap p-4 pt-0 pb-0 gap-3">
        <div className="flex w-auto items-center gap-3">
          <Select
            title={"Sort by"}
            onChange={(e) => {
              setSortBySelected(e.target.value);
            }}
            options={sortByOptions}
            defaultOption={"Default"}
          />
          <Select
            title={"Order"}
            onChange={(e) => {
              setOrderSelected(e.target.value);
            }}
            options={orderOptions}
            defaultOption={"Default"}
          />
        </div>

        <Button
          className="min-w-32 btn join-item btn-primary text-white"
          onClick={() => setOpenModalNewProduct((prev) => !prev)}
        >
          New Product
        </Button>
      </div>
      <div className="flex w-screen h-auto items-start justify-start flex-wrap p-4 gap-3">
        {response ? (
          <>
            {response.body.products
              ?.filter((product) => !product.isDeleted)
              .map((product) => {
                return (
                  <CardProduct
                    handleDelete={() => {
                      setProductSelected(product);
                      setOpenModalDelete((prev) => !prev);
                    }}
                    key={product.id}
                    product={product}
                    className={
                      response.body.products.length <= 1 ? "max-w-[305px]" : ""
                    }
                  />
                );
              })}

            <div className="join flex flex-wrap w-screen justify-between">
              <Select
                className="select select-bordered bg-card w-full max-w-32 btn btn-outline hover:bg-accent text-text"
                options={itemPerPageOptions}
                onChange={(e) => {
                  setCurrentPage(1);
                  setProductsPerPage(Number(e.target.value));
                }}
              />
              <div className="flex flex-wrap gap-2 items-center w-fit">
                <Button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="btn btn-outline min-w-32 text-link"
                >
                  Previous page
                </Button>
                <Button
                  disabled={skip + productsPerPage >= response.body.total}
                  className="btn btn-outline min-w-32 text-link"
                  onClick={goToNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full min-h-[90vh] justify-center items-center">
            <span className="loading loading-dots bg-span w-14" />
          </div>
        )}
      </div>

      <GenericModal
        loading={loading}
        open={openModalNewProduct}
        handleConfirm={handleSubmit}
        handleClose={() => setOpenModalNewProduct((prev) => !prev)}
      >
        <h2 className="font-bold text-lg mb-[-15px]">Create new couser!</h2>
        <div className="modal-action w-full flex-col">
          <ProductForm
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </GenericModal>

      <GenericModal
        loading={loading}
        open={openModalDelete}
        textButtonPrimary="Delete"
        handleConfirm={() => handleConfirmDelete()}
        handleClose={() => setOpenModalDelete((prev) => !prev)}
      >
        <div className="w-full h-auto flex flex-col items-center justify-center gap-1">
          <Image
            width={74}
            height={74}
            content="center"
            src={icons.alertTriangle}
            alt="Image warning triangle"
          />
          <h2 className="font-semibold text-2xl">Do you want to delete it?</h2>
          <p className="text-base font-thin text-center mb-6">
            Do you want to delete these products? This action cannot be undone.
          </p>
        </div>
      </GenericModal>
    </Layout>
  );
}
