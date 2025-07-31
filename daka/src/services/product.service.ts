import type { Products } from "@/interfaces/products.interfaces";
import axios from "axios";

const url: string = "https://fakestoreapi.com/products"

export const productService = {

    getProducts: async () => {
        try {

            return (await axios.get<Products[]>(url)).data;

        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },
    getCategories: async () => {
        try {

            return (await axios.get<string[]>(url + "/categories")).data;

        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },
};