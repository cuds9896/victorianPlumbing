export type ProductsList = Product[];

export interface Product {
  id: string;
  legacyId?: string;
  legacyVariantId?: string;
  cultureCode?: string;
  isDefaultVariant?: boolean;
  sku?: string;
  productName?: string;
  slug?: string;
  averageRating?: number;
  reviewsCount?: number;
  questionsCount?: number;
  image?: ProductImage;
  stockStatus?: StockStatus;
  price?: ProductPrice;
  attributes?: ProductAttributes;
  defaultCategory?: Category;
  brand?: Brand;
  score?: number;
}

export interface ProductImage {
  externalId?: string;
  url?: string;
  priority?: number;
  isDefault?: boolean;
  attributes?: {
    imageAltText?: string;
    [key: string]: any;
  };
}

export interface StockStatus {
  status?: string;
}

export interface ProductPrice {
  currencyCode?: string;
  priceIncTax?: number;
  priceExcTax?: number;
  wasPriceIncTax?: number;
  wasPriceExcTax?: number;
  isOnPromotion?: boolean;
  discountPercentage?: number;
  monthlyFinanceEstimate?: number;
  [key: string]: any;
}

export interface ProductAttributes {
  isBestSeller?: boolean;
  isShortProjection?: boolean;
  isEco?: boolean;
  [key: string]: any;
}

export interface Category {
  externalId?: string;
  slug?: string;
  name?: string;
  isDefault?: boolean;
  ancestors?: CategoryAncestor[];
}

export interface CategoryAncestor {
  slug?: string;
  externalId?: string;
  name?: string;
  depth?: number;
}

export interface Brand {
  externalId?: string;
  slug?: string;
  name?: string;
  brandImage?: ProductImage;
}
