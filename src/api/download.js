import axios from '@/libs/api.request'

export const getApps = ({ page, size }) => {
    return axios.request({
        url: '/vpn/app/apps',
        params: { 'page': page, 'size': size },
        method: 'get'
    })
}

export const updateApp = (app) => {
    return axios.request({
        url: '/vpn/app/app',
        data: app,
        method: 'put'
    })
}