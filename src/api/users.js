import axios from '@/libs/api.request'

export const getUsers = ({ email, token }) => {
    return axios.request({
        url: '/vpn/user/get-info-list',
        data: { 'email': email, 'token': token },
        method: 'post'
    })
}

export const updateUser = (user) => {
    return axios.request({
        url: '/vpn/user/user-info',
        data: user,
        method: 'put'
    })
}

export const deleteUser = ({ user_id, token }) => {
    return axios.request({
        url: '/vpn/user/user-info',
        params: { 'user_id': user_id, 'token': token },
        headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'delete'
    })
}