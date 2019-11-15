import axios from '@/libs/api.request'

export const getPrices = ({ page, size, token }) => {
    return axios.request({
        url: '/api/admin/listPlans',
        data: { 'token': token, 'page': page, 'size': size },
        method: 'post'
    })
}

export const updatePrice = (price) => {
    return axios.request({
        url: '/vpn/price/price',
        data: price,
        method: 'put'
    })
}

export const deletePrice = (plan) => {
    return axios.request({
        url: '/vpn/price/price',
        params: {'plan':plan},
        method: 'delete'
    })
}