"use client";

import Image from "next/image";

import { Button } from "../../elements";
import { icons } from "@/app/assets/icons";
import { images } from "@/app/assets/images";
import { cardProductDetailsProps } from "./@types";

export const CardProductDetails = ({
  product,
  className,
  handleEdit,
  handleDelete,
  ...res
}: cardProductDetailsProps) => {

  return (
    <div
      {...res}
      className={`card card-compact bg-card min-w-[305px] min-h-[365px] shadow-xl flex-1 max-[400px]:min-w-full ${className}`}
    >
      <div className="card card-side bg-card w-full h-auto shadow-xl overflow-hidden">
        <figure className="w-[365px] min-h-[365px] bg-input">
          <Image
            alt="Shoes"
            width={365}
            height={365}
            loading="eager"
            content="center"
            src={
              product.images[0] ||
              product.thumbnail ||
              images.fallback
            }
            className={
              product.images[0] || product.thumbnail
                ? ""
                : "h-full"
            }
          />
        </figure>
        <div className="card-body p-4">
          <Button
            onClick={handleDelete}
            className="btn btn-ghost btn-circle absolute right-[10px] top-[10px]"
          >
            <Image className="size-7" alt={`Image trash`} src={icons.trash} />
          </Button>
          <h2 className="card-title text-5xl">{product.title}</h2>
          <p className="capitalize text-xl font-thin max-w-[70%]">
            {product.description}
          </p>
          <p className="capitalize text-lg mt-3">
            <b>Category:</b> {product.category}
          </p>
          <p className="capitalize text-lg ">
            <b>In stock:</b> {product.stock}
          </p>
          <p className="capitalize text-lg ">
            <b>price:</b> ${product.price}
          </p>
          <p className="capitalize text-lg">
            <b>Discount:</b> {product.discountPercentage}%
          </p>

          <div
            onClick={handleEdit}
            className="card-actions justify-end"
          >
            <Button className="min-w-32 btn btn-primary text-white text-base">
              Editar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
