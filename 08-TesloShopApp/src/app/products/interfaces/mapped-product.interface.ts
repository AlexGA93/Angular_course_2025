import { Gender, Size, Tag } from "./product.interface";

export interface MappedProductsResponse {
    count:    number;
    pages:    number;
    products: MappedProduct[];
}


export interface MappedProduct {
    id:          string;
    title:       string;
    price:       number;
    desc: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        Tag[];
    images:      string[];
    // user:        User;
}