import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import { COLLAPSE_MENU } from './mutations-type'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {
    [COLLAPSE_MENU] (state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
  },
  modules: {
    tab
  }
})
