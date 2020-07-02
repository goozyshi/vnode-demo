import { ADD_TAB, DELETE_TAB, SET_INDEX, CLEAR_TAB } from './mutations-type'
export default {
  nameSpace: true,
  state: {
    visitedTabs: [],
    currentIndex: '/'
  },
  mutations: {
    [ADD_TAB] (state, data) {
      state.visitedTabs.push(data)
    },
    [DELETE_TAB] (state, route) {
      const index = state.visitedTabs.findIndex(op => op.route === route)
      state.visitedTabs.splice(index, 1)
    },
    [SET_INDEX] (state, index) {
      console.log('路由：', index)
      state.currentIndex = index
    },
    [CLEAR_TAB] (state) {
      state.visitedTabs = []
    }
  },
  actions: {}
}
