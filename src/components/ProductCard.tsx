import React from "react";
import { Product } from "../types/productsListType";

interface ProductCardProps {
  product: Product;
}

const statusMap: Record<string, { label: string; classes: string }> = {
  G: { label: "In stock", classes: "bg-green-100 text-green-800" },
  O: { label: "Out of stock", classes: "bg-red-100 text-red-800" },
  R: { label: "Limited", classes: "bg-yellow-100 text-yellow-800" },
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imgUrl = product.image?.url || "/placeholder-product.png";
  const alt =
    product.image?.attributes?.imageAltText ||
    product.productName ||
    "Product image";
  const price = product.price?.priceIncTax ?? null;
  const currency = product.price?.currencyCode ?? "GBP";
  const wasPrice = product.price?.wasPriceIncTax ?? null;
  const statusKey = product.stockStatus?.status ?? "";
  const status = statusMap[statusKey] ?? {
    label: "Unknown",
    classes: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <a
        href={product.slug || "#"}
        className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-labelledby={`product-${product.id}`}
      >
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={imgUrl}
            alt={alt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3
            id={`product-${product.id}`}
            className="text-sm font-medium text-gray-900 line-clamp-2 mb-2"
          >
            {product.productName}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {wasPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {wasPrice ? `${currency} ${wasPrice.toFixed(2)}` : ""}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {price ? `${currency} ${price.toFixed(2)}` : "—"}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-gray-900">
                  {price ? `${currency} ${price.toFixed(2)}` : "—"}
                </span>
              )}
              <span className="text-xs text-gray-500 mt-1">
                {product.brand?.name || ""}
              </span>
            </div>

            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${status.classes}`}
              >
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
