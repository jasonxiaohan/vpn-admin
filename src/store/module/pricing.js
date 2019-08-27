import { getPrices,updatePrice,deletePrice } from '@/api/pricing'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {

    },
    actions: {
        handlePriceList({ state, commit }, { page, size }) {
            return new Promise((resolve, reject) => {
                getPrices({ "page": page, "size": size, token: this.state.user.token }).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleUpdatePrice({state,commit},{price}) {
            return new Promise((resolve,reject) => {
                updatePrice(price).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }) 
        },
        handleDeletePrice({state,commit},{plan}) {
            return new Promise((resolve,reject) => {
                deletePrice(plan).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}