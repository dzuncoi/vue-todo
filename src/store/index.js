import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const STORAGE_KEY = 'VUE_TODO_ITEMS';

function storeLocally(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default new Vuex.Store({
  state: {
    todoItems: [],
  },
  getters: {
    completedItems: state => state.todoItems.filter(t => t.isCompleted),
    inCompletedItems: state => state.todoItems.filter(t => !t.isCompleted),
    orderedItems: state => state.todoItems.sort((a, b) => a.dateCreated - b.dateCreated),
  },
  actions: {
    getTodoItems(context) {
      const itemStr = localStorage.getItem(STORAGE_KEY) || '[]';
      const items = JSON.parse(itemStr);
      context.commit('updateTodo', { items });
    },
  },
  mutations: {
    updateTodo(state, payload) {
      payload.items.forEach(item => state.todoItems.push(item));
    },
    addTodo(state, payload) {
      state.todoItems.push(payload.item);
      storeLocally(state.todoItems);
    },
    toggleTodoItem(state, payload) {
      const item = state.todoItems.filter(i => i.key === payload.id)[0];
      Vue.set(item, 'isCompleted', !item.isCompleted);
      storeLocally(state.todoItems);
    },
    deleteTodoItem(state, payload) {
      let index;
      state.todoItems.forEach((item, i) => {
        if (item.key === payload.id) index = i;
      });
      state.todoItems.splice(index, 1);
      storeLocally(state.todoItems);
    },
  },
});
