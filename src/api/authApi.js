const URL = `https://api-class-o1lo.onrender.com/api/lamnp/auth/`
export const registerAuth = async (data) => {
    const res = await axios.post(URL + `/register`, data)
    return res
}

export const loginAuth = async (data) => {
    const res = await axios.post(URL + `/login`, data)
    return res
}