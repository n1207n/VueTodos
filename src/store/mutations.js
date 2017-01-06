export const mutations = {
  addTodo(state, { text }) {
    state.todos.push({
      text,
      done: false,
    });
  },

  editTodo(state, { todo, value }) {
    todo.text = value;
  },

  deleteTodo(state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  toggleTodo(state, { todo }) {
    todo.done = !todo.done;
  },

  toggleAllTodos(state, { done }) {
    state.todos.forEach((todo) => {
      todo.done = done;
    });
  },

  clearDoneTodos(state) {
    state.todos.filter((todo) => !todo.done);
  },
};
