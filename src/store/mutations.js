export default {
  addTodo(state, { text }) {
    state.todos.push({
      text,
      done: false,
    });
  },

  editTodo(state, { todo, value }) {
    const todoToEdit = todo;
    todoToEdit.text = value;
  },

  deleteTodo(state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  toggleTodo(state, { todo }) {
    const todoToDelete = todo;
    todoToDelete.done = !todo.done;
  },

  toggleAllTodos(state, { done }) {
    state.todos.forEach((item) => {
      const todo = item;
      todo.done = done;
    });
  },

  clearDoneTodos(state) {
    state.todos.filter(todo => !todo.done);
  },
};
