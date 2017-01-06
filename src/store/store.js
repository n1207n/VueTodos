export const LOCALSTORAGE_KEY = 'vue-todosmvc';

export const state = {
  todos: JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY) || '[]');
};
