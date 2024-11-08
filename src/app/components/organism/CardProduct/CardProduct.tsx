"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../../elements";
import { cardProductProps } from "./@types";
import { images } from "@/app/assets/images";
import { formatter } from "@/app/utils/utils";

export const CardProduct = ({
  product,
  className,
  handleDelete,
  ...res
}: cardProductProps) => {
  const router = useRouter();

  return (
    <div
      {...res}
      className={`card card-compact bg-card min-w-[305px] h-[365px] shadow-xl flex-1 max-[400px]:min-w-full ${className}`}
    >
      <figure className="bg-input custom-rounded">
        <Image
          alt="Shoes"
          width={160}
          height={50}
          loading="eager"
          content="center"
          src={product.thumbnail || images.fallback}
          className={product.thumbnail ? "" : "w-full"}
        />
      </figure>
      <div className="py-2 px-3 min-h-40">
        <h2 className="w-full text-end text-label text-[20px] font-semibold justify-end">
          {formatter({
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(product.price || 0)}
        </h2>
        <h2 className="w-full mt-2 text-start text-label text-[20px] font-semibold justify-end">
          {product.title}
        </h2>

        <p className="w-full text-start text-text text-[14px] font-normal line-clamp">
          {product.description}
        </p>
      </div>
      <div className="join  w-full">
        <Button className="btn join-item flex-1 bg-card text-red-600 hover:bg-background border divide-solid border-border" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          className="btn join-item flex-1 bg-card text-link hover:bg-background border divide-solid border-border"
          onClick={() => router.push(`/pages/products/${product.id}`)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
