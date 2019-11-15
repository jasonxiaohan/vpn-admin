import axios from '@/libs/api.request'

export const getReferral = () => {
    return axios.request({
        url: '/vpn/referral/referral',
        params: { 'refkey': 'referral:setting' },
        method: 'get'
    })
}

export const updateReferral = ({friend, month, token}) => {
    return axios.request({
        url: '/api/admin/referralSetting',
        params: {
            'numOfFriends': friend,
            'numOfDays': month,
            'token': token
        },
        method: 'POST'
    })
}