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
  getters: {
    completedItems: state => state.todoItems.filter(t => t.isCompleted),
    inCompletedItems: state => state.todoItems.filter(t => !t.isCompleted),
    orderedItems: state => state.todoItems.sort((a, b) => a.dateCreated - b.dateCreated),
  },
  mutations: {
    addTodo(state, payload) {
      state.todoItems.push(payload.item);
    },
  },
});
