<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in orderedItems" :key="item.dateCreated">
        <todo-item :item="item" key="item.key" />
      </li>
    </ul>
    <input type="text" class="form-input" v-model="todoInput" @keyup.enter="onSubmitTodo">
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TodoItem from './TodoItem';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  data() {
    return {
      title: 'Item List',
      todoInput: '',
    };
  },
  computed: {
    ...mapState([
      'todoItems',
    ]),
    ...mapGetters([
      'completedItems',
      'inCompletedItems',
      'orderedItems',
    ]),
  },
  methods: {
    ...mapMutations({
      addTodo: 'addTodo',
    }),
    onSubmitTodo() {
      const newItem = {
        name: this.todoInput,
        dateCreated: new Date().getTime(),
        isCompleted: false,
        key: Math.floor(Math.random() * 3000),
      };
      this.addTodo({ item: newItem });
      this.todoInput = '';
    },
  },
  created() {
    this.$store.dispatch('getTodoItems');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
