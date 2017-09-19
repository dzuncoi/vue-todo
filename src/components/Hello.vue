<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in orderedItems" :key="item.dateCreated">
        <p>
          {{ item.name }}
          <span class="text-mute">{{ `- at ${translateTime(item.dateCreated)}` }}</span>
        </p>
      </li>
    </ul>
    <input type="text" class="form-input" v-model="todoInput" @keyup.enter="onSubmitTodo">
  </div>
</template>

<script>
import moment from 'moment';

const todoItems = [{
  name: 'Dzuncoi',
  dateCreated: new Date().getTime(),
  isCompleted: true,
}, {
  name: 'Khanh tien',
  dateCreated: new Date().getTime() - (Math.random() * 24 * 60 * 60 * 1000),
  isCompleted: false,
}];

export default {
  name: 'hello',
  data() {
    return {
      todoItems,
      title: 'Item List',
      todoInput: '',
    };
  },
  computed: {
    completedItems() {
      return this.todoItems.filter(t => t.isCompleted);
    },
    inCompletedItems() {
      return this.todoItems.filter(t => !t.isCompleted);
    },
    orderedItems() {
      return this.todoItems.sort((a, b) => a.dateCreated - b.dateCreated);
    },
  },
  methods: {
    translateTime: time => moment(time).format('hh:mm ddd/MM/YYYY'),
    onSubmitTodo() {
      this.todoItems.push({
        name: this.todoInput,
        dateCreated: new Date().getTime(),
        isCompleted: false,
      });
      this.todoInput = '';
    },
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
