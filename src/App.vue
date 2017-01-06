<template>
  <div id="app">
    <img src="./assets/logo.png">
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import todo from './components/Todo';

const filters = {
  all: todos => todos,
  active: todos => todos.filter(item => !item.done),
  completed: todos => todos.filter(item => item.done),
};

export default {
  name: 'app',
  components: {
    todo,
  },
  data() {
    return {
      visibility: 'all',
      filters,
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    checkAllTodos() {
      return this.todos.every(item => item.done);
    },
    filterTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter(item => !item.done).length;
    },
  },
  methods: {
    // App component now has access to injected appStore instance's mutation methods
    ...mapMutations([
      'toggleAllTodos',
      'clearDoneTodos',
    ]),
    addTodo(e) {
      const targetEvent = e;
      var text = targetEvent.target.value;

      if (text.trim()) {
        // Add a new todo to Vuex store
        this.$store.commit('addTodo', { text });
      }

      targetEvent.target.event = '';
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
