import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoItems: [
      {
        key: Math.floor(Math.random() * 3000),
        name: 'Dzuncoi',
        dateCreated: new Date().getTime(),
        isCompleted: true,
      },
      {
        key: Math.floor(Math.random() * 3000),
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
    toggleTodoItem(state, payload) {
      const item = state.todoItems.filter(i => i.key === payload.id)[0];
      Vue.set(item, 'isCompleted', !item.isCompleted);
    },
    deleteTodoItem(state, payload) {
      let index;
      state.todoItems.forEach((item, i) => {
        if (item.key === payload.id) index = i;
      });
      state.todoItems.splice(index, 1);
    },
  },
});
