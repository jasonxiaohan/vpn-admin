import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import users from './module/users'
import pricing from './module/pricing'
import referral from './module/referral'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    users,
    pricing,
    referral
  }
})
