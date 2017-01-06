<template>
  <div id="app">
    <img src="./assets/logo.png">
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import todo from './components/Todo.vue';

const filters = {
  all: todos => todos,
  active: todos => todos.filter((item) => !item.done),
  completed: todos => todos.filter((item) => item.done),
};

export default {
  name: 'app',
  components: {
    todo,
  },
  data () {
    visibility: 'all',
    filters: filters,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
