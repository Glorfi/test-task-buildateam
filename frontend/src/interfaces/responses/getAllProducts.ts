export interface IGetAllProductResponse {
  getAllProducts: IProduct[];
}

export interface IProduct {
  id: string;
  images: IProductImage[];
  bodyHTML: string;
}

export interface IProductImage {
  src: string;
}
