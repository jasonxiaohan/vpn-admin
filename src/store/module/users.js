import { getUsers, updateUser, deleteUser,getInvites } from '@/api/users'
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
        }
    }
}