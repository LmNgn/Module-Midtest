import axiosClient from "./axiosClient";

export const productApi = {
    getAll: async (params = {}) => {
        const res = await axiosClient.get("/products", { params });
        return res.data;
    },
    getById: async (id) => {
        const res = await axiosClient.get(`/products/${id}`);
        return res.data;
    },
    create: async (data) => {
        const res = await axiosClient.post("/products", data);
        return res.data;
    },
    update: async (id, data) => {
        const res = await axiosClient.put(`/products/${id}`, data);
        return res.data;
    },
    remove: async (id) => {
        const res = await axiosClient.delete(`/products/${id}`);
        return res.data;
    }
};
