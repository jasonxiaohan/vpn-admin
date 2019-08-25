import { getUsers, updateUser, deleteUser } from '@/api/users'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {

    },
    actions: {
        handleUsersCard({ state, commit }, { email }) {
            return new Promise((resolve, reject) => {
                getUsers({ "email": email, token: this.state.user.token }).then(res => {
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
        handleDeleteUser({ state, commit }, { user_id }) {
            return new Promise((resolve, reject) => {
                deleteUser({ "user_id": user_id, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}