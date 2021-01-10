import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import { COLLAPSE_MENU, SET_BREADCRUMB } from './mutations-type'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    breadcrumbList: []
  },
  mutations: {
    [COLLAPSE_MENU] (state) {
      state.isCollapse = !state.isCollapse
    },
    [SET_BREADCRUMB] (state, data) {
      state.breadcrumbList = [...data]
    }
  },
  actions: {
  },
  modules: {
    tab
  }
})
