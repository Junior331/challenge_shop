/* eslint-disable @typescript-eslint/no-explicit-any */
export type httpRequest = {
  body: any;
  url: string;
  headers: any;
  method: "get" | "post" | "put" | "delete";
};

export type optionDefault = {
  label: string;
  value: string;
};

type Dimensions = {
  width: number;
  depth: number;
  height: number;
};

type Reviews = {
  date: string;
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Meta = {
  qrCode: string;
  barcode: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  meta: Meta;
  sku: string;
  title: string;
  price: number;
  stock: number;
  brand: string;
  rating: number;
  weight: number;
  tags: string[];
  category: string;
  images: string[];
  thumbnail: string;
  isDeleted: boolean;
  reviews: Reviews[];
  description: string;
  returnPolicy: string;
  dimensions: Dimensions;
  discountPercentage: number;
  availabilityStatus: string;
  warrantyInformation: string;
  shippingInformation: string;
  minimumOrderQuantity: number;
};

export type ProductSummary = {
  title: string;
  price: number;
  stock: number;
  discountPercentage: number;
};

export type ProductsResponse = {
  skip: number;
  total: number;
  limit: number;
  products: Product[];
};

export type useAxiosRequestProps = {
  RequestResponse: any;
};

export type httpClientResponse<T = any> = {
  body: T;
  statusCode: number;
};

export type formatterProps = {
  type?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  style?: keyof Intl.NumberFormatOptionsStyleRegistry;
};