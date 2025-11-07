import axiosClient from "./axiosClient";

export const categoryApi = {
    getAll: async () => {
        const res = await axiosClient.get("/categories");
        return res.data;
    },
    getById: async (id) => {
        const res = await axiosClient.get(`/categories/${id}`);
        return res.data;
    },
    create: async (data) => {
        const res = await axiosClient.post("/categories", data);
        return res.data;
    },
    update: async (id, data) => {
        const res = await axiosClient.put(`/categories/${id}`, data);
        return res.data;
    },
    canDelete: async (id) => {
        const res = await axiosClient.get("/products", { params: { categoryId: id } });
        return res.data.length === 0;
    },
    remove: async (id) => {
        const res = await axiosClient.delete(`/categories/${id}`);
        return res.data;
    }
};
