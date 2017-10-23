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
    detailItem: {},
    detailItemId: '',
  },
  getters: {
    completedItems: state => state.todoItems.filter(t => t.isCompleted),
    inCompletedItems: state => state.todoItems.filter(t => !t.isCompleted),
    orderedItems: state => state.todoItems.sort((a, b) => a.dateCreated - b.dateCreated),
    detailItem: state => state.detailItem,
  },
  actions: {
    getTodoItems(context) {
      const itemStr = localStorage.getItem(STORAGE_KEY) || '[]';
      const items = JSON.parse(itemStr);
      context.commit('updateTodo', { items, force: true });
    },
    getTodoItem(context, payload) {
      let result = {};
      const itemStr = localStorage.getItem(STORAGE_KEY) || '[]';
      const items = JSON.parse(itemStr);
      result = items.filter(i => JSON.stringify(i.key) === payload.id)[0];
      context.commit('setTodoItemDetail', { item: result });
    },
  },
  mutations: {
    updateTodo(state, payload) {
      // eslint-disable-next-line
      if (payload.force) state.todoItems = [];
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
    setTodoItemDetail(state, payload) {
      // eslint-disable-next-line
      state.detailItem = { ...state.detailItem, ...payload.item };
    },
    setDetailItemId(state, payload) {
      // eslint-disable-next-line
      state.detailItemId = payload.id;
    },
  },
});
