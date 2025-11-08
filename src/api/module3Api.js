import api from "./api"

export const getTaskByProject = async (id) => {
    const { data } = await api.get(`/tasks?projectId=${id}`)
    return data
}