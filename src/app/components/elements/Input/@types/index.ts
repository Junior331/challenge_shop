import { InputHTMLAttributes, ReactNode } from "react";

export type Props = {
  label?: string;
  error?: boolean;
  linkLabel?: string;
  helperText?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

