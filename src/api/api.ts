import { axios } from './http'

interface loginParams {
    username: string
    password: string
}

export const loginApi = (data: loginParams) => {
    return axios.post('/park/login', data)
}

// interface cblApiParams {
//     Authorization: string
// }

export const cblApi = (data?: any) => {
    return axios.get('/park/sys/permision/all/tree', data)
}

export const listApi = (data?: any) => {
    return axios.get('/parking/card/list', data)
}

interface addParams {
    personName: string
    phoneNumber: string
    carNumber: string
    carBrand: string
    cardStartDate: string
    cardEndDate: string
    paymentAmount: string
    paymentMethod: string
}

export const addApi = (data: addParams) => {
    return axios.post('/parking/card', data)
}

export const delsApi = (data: { ids: string[] }) => {
    return axios.delete(`/parking/card/${data.ids}`, data)
}