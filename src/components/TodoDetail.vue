<template>
  <div>
    <h3>Detail</h3>
    <div>
      <p>Item Id: {{ detailItem.key }}</p>
      <p>Item Name: {{ detailItem.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TodoDetail',
  methods: {
    ...mapMutations([
      'setDetailItemId',
      'setTodoItemDetail',
    ]),
    ...mapActions([
      'getTodoItem',
    ]),
  },
  computed: {
    ...mapGetters([
      'detailItem',
    ]),
  },
  beforeMount() {
    this.setDetailItemId({ id: this.$route.params.id });
    this.$store.dispatch('getTodoItem', { id: this.$route.params.id });
  },
};
</script>
