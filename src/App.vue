<template>
  <section id="app">
    <header>
      <h1>Todos</h1>

      <input type="text" class="new-todo" autofocus autocomplete="off" placeholder="What do you need to do?" @keyup.enter="addTodo" />
    </header>

    <section class="todo-list-container" v-show="todos.length">
      <input type="checkbox" class="toggle-all" :checked="checkAllTodos" @change="toggleAll({ done: !allChecked })" />

      <ul class="todo-list">
        <todo v-for="todo in filterTodos" :todo="todo"></todo>
      </ul>
    </section>

    <footer v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>

      <ul class="filters">
        <li v-for="(val, key) in filters">
          <a :href="'#/' + key" :class="{ selected: visibility === key }" @click="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>

      <button type="button" class="clear-completed" v-show="todos.length > remaining" @click="clearDoneTodos">Clear done todos</button>
    </footer>
  </section>
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
      const text = targetEvent.target.value;

      if (text.trim()) {
        // Add a new todo to Vuex store
        this.$store.commit('addTodo', { text });
      }

      targetEvent.target.event = '';
    },
  },
  filters: {
    pluralize: function pluralize(itemCount, word) {
      return itemCount === 1 ? word : `${word}s`;
    },
    capitalize: string => string.charAt(0).toUpperCase() + string.slice(1),
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
