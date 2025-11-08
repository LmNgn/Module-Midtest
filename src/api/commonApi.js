import api from "./api"

export const getList = async (key) => {
    const data = await api.get(`/${key}`)
    return data
}

export const getOne = async (key, id) => {
    const data = await api.get(`/${key}/${id}`)
    return data
}

export const createItem = async (key, body) => {
    const data = await api.post(`/${key}`, body)
    return data
}
export const updateItem = async (key, id, body) => {
    const data = await api.put(`/${key}/${id}`, body)
    return data
}
export const deleteItem = async (key, id) => {
    const data = await api.delete(`/${key}/${id}`)
    return data
}

