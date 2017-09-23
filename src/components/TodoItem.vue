<template>
  <div>
    <input :id="item.key" type="checkbox" :checked="item.isCompleted" @change="onChange" />
    <label :for="item.key" class="item-label">
      <p class="item-text" :class="{ 'in-active': item.isCompleted }">
        {{ item.name }}
        <span class="text-mute">{{ `- at ${translatedDate}` }}</span>
      </p>
    </label>
  </div>
</template>

<script>
import moment from 'moment';
import { mapMutations } from 'vuex';

export default {
  name: 'TodoItem',
  props: ['item'],
  computed: {
    translatedDate() {
      return moment(this.item.dateCreated).format('hh:mm ddd/MM/YYYY');
    },
  },
  methods: {
    ...mapMutations([
      'toggleTodoItem',
    ]),
    onChange() {
      this.toggleTodoItem({ id: this.item.key });
    },
  },
};
</script>

<<style>
.item-label:hover {
  cursor: pointer;
  user-select: none;
}
.item-text {
  display: inline-block;
}
.item-text.in-active {
  text-decoration: line-through;
  color: #999;
}
</style>
