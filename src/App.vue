<template>
  <div id="app">
    <md-layout md-gutter>
      <md-layout md-gutter md-flex-xsmall="100" md-flex-small="33" md-flex-medium="33" class="main-conatiner">
        <md-whiteframe md-tag="section" class="todo-app-container">
          <header>
            <h1 class="md-display-1">Todos</h1>

            <md-input-container>
              <md-input type="text" class="new-todo" autofocus autocomplete="off" placeholder="What do you need to do?" @keyup.native.enter="addTodo" />
            </md-input-container>
          </header>

          <section class="todo-list-container" v-show="todos.length">
            <div class="select-all-container">
              <label class="md-title">Select all </label><md-checkbox class="toggle-all" v-model="allChecked" @change="toggleAllTodos({ done: !allChecked })" />
            </div>

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

            <md-button type="button" class="clear-completed md-primary" v-show="todos.length > remaining" @click="clearDoneTodos">Clear done todos</md-button>
          </footer>
        </md-whiteframe>
      </md-layout>
    </md-layout>
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
      allChecked: false,
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
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div.md-layout {
  justify-content: center;
}

.todo-app-container {
  margin: 16px;
  padding: 16px;
  text-align: center;

  @media(min-width: 320px) {
    width: 240px;
  }

  @media(min-width: 601px) {
    width: 320px;
  }

  @media(min-width: 961px) {
    width: 480px;
  }
}

.select-all-container {
  margin: 8px;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}
</style>
