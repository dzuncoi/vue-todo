import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoItems: [
      {
        key: Math.random(),
        name: 'Dzuncoi',
        dateCreated: new Date().getTime(),
        isCompleted: true,
      },
      {
        key: Math.random(),
        name: 'Khanh tien',
        dateCreated: new Date().getTime() - (Math.random() * 24 * 60 * 60 * 1000),
        isCompleted: false,
      },
    ],
  },
  mutations: {
    addTodo(state, payload) {
      state.todoItems.push(payload.item);
    },
  },
});
