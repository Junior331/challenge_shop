import { optionDefault } from "@/app/utils/types";
import { SelectHTMLAttributes } from "react";

export type Props = {
  title?: string;
  defaultOption?: string;
  options: optionDefault[];
} &  SelectHTMLAttributes<HTMLSelectElement>;
