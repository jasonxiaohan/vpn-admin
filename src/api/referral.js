import axios from '@/libs/api.request'

export const getReferral = () => {
    return axios.request({
        url: '/vpn/referral/referral',
        params: { 'refkey': 'referral:setting' },
        method: 'get'
    })
}

export const updateReferral = (friend, month) => {
    return axios.request({
        url: '/vpn/referral/referral',
        params: {
            'friend': friend,
            'month': month
        },
        method: 'put'
    })
}