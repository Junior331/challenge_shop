"use client";

import Image from "next/image";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { icons } from "@/app/assets/icons";
import { deleteProduct } from "../services";
import { GenericModal } from "@/app/components/modules";
import { fetchProduct, updateProduct } from "./services";
import { SnackbarContext } from "@/app/contexts/Snackbar";
import { useAxiosRequest } from "@/app/hooks/axiosAdapter";
import { Product as ProductResponse, ProductSummary } from "@/app/utils/types";
import { productFormSchema } from "@/app/components/organism/ProductForm/schema";
import {
  CardProductDetails,
  ProductForm,
  Layout,
} from "@/app/components/organism";

export default function Product() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { response, request } = useAxiosRequest<ProductResponse>();

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
      if (id) {
        await updateProduct({
          request,
          data: body,
          setLoading,
          setSnackbar,
          setOpenModalEdit,
          id: id as string,
        });
      }
    },
    validationSchema: productFormSchema,
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;

  useEffect(() => {
    if (id) {
      fetchProduct({ request, id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="ml-7 mt-2 breadcrumbs text-sm w-full">
        <ul>
          <li>
            <a onClick={() => router.push(`/pages/products`)}>Products</a>
          </li>
          <li>{response?.body.title}</li>
        </ul>
      </div>
      <div className="p-4 h-auto w-full flex items-start justify-start">
        {response ? (
          <CardProductDetails
            key={response?.body.id}
            product={response?.body}
            handleEdit={() => setOpenModalEdit((prev) => !prev)}
            handleDelete={() => setOpenModalDelete((prev) => !prev)}
          />
        ) : (
          <div className="flex w-full min-h-[90vh] justify-center items-center">
            <span className="loading loading-dots bg-span w-14" />
          </div>
        )}
      </div>

      <GenericModal
        loading={loading}
        open={openModalEdit}
        handleConfirm={handleSubmit}
        handleClose={() => setOpenModalEdit((prev) => !prev)}
      >
        <h2 className="font-bold text-lg mb-[-15px]">
          Editar detalhes do couser!
        </h2>
        <div className="modal-action w-full flex-col">
          <ProductForm
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            placeholders={{
              name: response?.body.title || "",
              price: `$${response?.body.price}`,
              inStock: response?.body.stock.toString() || "",
              discount: `${response?.body.discountPercentage}%`,
            }}
          />
        </div>
      </GenericModal>

      <GenericModal
        loading={loading}
        open={openModalDelete}
        textButtonPrimary="Delete"
        handleConfirm={() =>
          deleteProduct({
            router,
            request,
            setLoading,
            setSnackbar,
            id: id as string,
            setOpenModalDelete,
          })
        }
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
