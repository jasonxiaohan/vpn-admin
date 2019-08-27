// import { getInfoCard } from '@/api/system'
// import { setToken, getToken } from '@/libs/util'

// export default {
//     state: {
//         token: getToken(),
//     },
//     mutations: {

//     },
//     actions: {
//         handleInfoCard({ state, commit }) {
//             return new Promise((resolve, reject) => {
//                 console.log(state);
//                 getInfoCard(state.token).then(res=>{
//                     const data = res.data.data 
//                     resolve(data)
//                 }).catch(err=>{
//                     reject(err)
//                 })
//             })
//         }
//     }
// }