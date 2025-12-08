import axios from "axios";

const API_BASE_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

export interface GetProductsParams {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages: number;
  sort: number;
}

export const getProducts = async (params: GetProductsParams) => {
  const {
    query = "",
    pageNumber = 1,
    size = 10,
    additionalPages = 0,
    sort = 0,
  } = params;

  try {
    const response = await axios.post(API_BASE_URL, {
      query,
      pageNumber,
      size,
      additionalPages,
      sort,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
