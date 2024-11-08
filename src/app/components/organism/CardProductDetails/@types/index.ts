import { Product } from "@/app/utils/types";
import { HtmlHTMLAttributes } from "react";

export type cardProductDetailsProps = {
  product: Product;
  className?: string;
  handleEdit: () => void;
  handleDelete: () => void;
} & HtmlHTMLAttributes<HTMLDivElement>;
