import { getUsers, updateUser, deleteUser, getInvites, subHistory,referralHistory } from '@/api/users'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {

    },
    actions: {
        handleUsersCard({ state, commit }, { email, page, size }) {
            return new Promise((resolve, reject) => {
                getUsers({ "email": email, "page": page, "size": size, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleUpdateUser({ state, commit }, { user }) {
            return new Promise((resolve, reject) => {
                updateUser(user).then(res => {
                    resolve(res);
                })
            })
        },
        handleDeleteUser({ state, commit }, { email }) {
            return new Promise((resolve, reject) => {
                deleteUser({ "email": email, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户邀请的好友列表
        handleInviteList({ state, commit }, { email, page, size }) {
            return new Promise((resolve, reject) => {
                getInvites({ "email": email, "page": page, "size": size, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 订阅列表
        handleSubHistory({ state, commit }, { customerId, page, size }) {
            return new Promise((resolve, reject) => {
                subHistory({ "customerId": customerId, "page": page, "size": size, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 赠送列表
        handleReferralHistory({ state, commit }, { customerId, page, size }) {
            return new Promise((resolve, reject) => {
                referralHistory({ "customerId": customerId, "page": page, "size": size, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}