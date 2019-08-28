import { getApps, updateApp } from '@/api/download'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {

    },
    actions: {
        handleApps({ state, commit }, { page, size }) {
            return new Promise((resolve, reject) => {
                getApps({ "page": page, "size": size }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleUpdateApp({ state, commit }, { app }) {
            return new Promise((resolve, reject) => {
                updateApp(app).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}