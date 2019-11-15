import { getReferral, updateReferral } from '@/api/referral'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {

    },
    actions: {
        handleReferral({ state, commit }) {
            return new Promise((resolve, reject) => {
                getReferral().then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleUpdateReferral({ state, commit }, { friend, month }) {
            return new Promise((resolve, reject) => {
                updateReferral({ "friend": friend, "month": month, "token": this.state.user.token }).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}