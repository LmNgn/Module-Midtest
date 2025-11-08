import api from "./api"

export const lessonsByCourse = async (id) => {
    const data = await api.get(`/lessons?courseId=${id}`)
    return data
} 