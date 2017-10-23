import Vue from 'vue';
import VueRouter from 'vue-router';

import TodoList from '../components/TodoList';
import TodoDetail from '../components/TodoDetail';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: '/',
    component: TodoList,
  }, {
    path: '/item/:id',
    component: TodoDetail,
  }],
});
