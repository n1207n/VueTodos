import { LOCALSTORAGE_KEY } from './state';

const localStoragePlugin = (store) => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
  });
};

export default [localStoragePlugin];
