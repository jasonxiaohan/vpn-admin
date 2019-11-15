import axios from '@/libs/api.request'

export const getUsers = ({ email, page, size, token }) => {
    return axios.request({
        url: '/api/admin/listCustomer',
        data: { 'email': email, 'pageSize': page, 'size': size, 'token': token },
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

export const deleteUser = ({ email, token }) => {
    return axios.request({
        url: '/vpn/user/user-info',
        params: { 'email': email, 'token': token },
        headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'delete'
    })
}

export const getInvites = ({ email, page, size, token }) => {
    return axios.request({
        url: '/vpn/user/invites',
        data: { 'email': email, 'page': page, 'size': size, 'token': token },
        method: 'post'
    })
}

export const subHistory = ({ customerId, page, size, token }) => {
    return axios.request({
        url: '/api/admin/subHistory',
        data: { 'customerId': customerId, 'pageSize': page, 'size': size, 'token': token },
        method: 'post'
    })
}

export const referralHistory = ({ customerId, page, size, token }) => {
    return axios.request({
        url: '/api/admin/listReferral',
        data: { 'customerId': customerId, 'pageSize': page, 'size': size, 'token': token },
        method: 'post'
    })
}