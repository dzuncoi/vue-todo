<template>
  <p>
    {{ item.name }}
    <span class="text-mute">{{ `- at ${translatedDate}` }}</span>
  </p>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TodoItem',
  props: ['item'],
  computed: {
    translatedDate() {
      return moment(this.item.dateCreated).format('hh:mm ddd/MM/YYYY');
    },
  },
};
</script>
