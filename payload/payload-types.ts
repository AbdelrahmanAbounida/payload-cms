export type CartItems =
  | {
      product?: (string | null) | Product;
      quantity?: number | null;
      id?: string | null;
    }[]
  | null;

export interface User {
  id: string;
  name?: string | null;
  roles?: ("admin" | "customer")[] | null;
  purchases?: (string | Product)[] | null;
  stripeCustomerID?: string | null;
  cart?: {
    items?: CartItems;
  };
  skipSync?: boolean | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}

export interface Product {
  id: string;
  title: string;
  publishedOn?: string | null;
  stripeProductID?: string | null;
  priceJSON?: string | null;
  enablePaywall?: boolean | null;
  categories?: (string | Category)[] | null;
  relatedProducts?: (string | Product)[] | null;
  slug?: string | null;
  skipSync?: boolean | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    //   image?: string | Media | null
  };
  updatedAt: string;
  createdAt: string;
  _status?: ("draft" | "published") | null;
}

export interface Category {
  id: string;
  title?: string | null;
  parent?: (string | null) | Category;
  breadcrumbs?:
    | {
        doc?: (string | null) | Category;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}

export interface Media {
  id: string;
  alt: string;
  caption?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
