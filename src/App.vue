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
  computed: {
    todos () {
      return this.$store.state.todos;
    },
    checkAllTodos () {
      return this.todos.every(todo => todo.done);
    },
    filterTodos () {
      return filters[this.visibility](this.todos);
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length;
    },
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
