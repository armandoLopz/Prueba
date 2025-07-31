import type { ApiDolarResponse } from "@/interfaces/dolar.interfaces";
import axios from "axios";

const url: string = "https://pydolarve.org/api/v2/dollar"

export const dolarService = {

    getDolarPrice: async () => {
        try {

            const response = (await axios.get<ApiDolarResponse>(url)).data;
            return response

        } catch (error) {
            console.error("Error fetching dolar data:", error);
            throw error;
        }
    },
};