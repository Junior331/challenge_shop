import { Product } from "@/app/utils/types";
import { HtmlHTMLAttributes } from "react";

export type cardProductProps = {
  product: Product;
  className?: string;
  handleDelete: () => void;
} & HtmlHTMLAttributes<HTMLDivElement>;
