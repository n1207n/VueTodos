<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <md-checkbox v-model="todo.done" @change="toggleTodo({ todo: todo })"/>

      <label class="md-headline" v-text="todo.text" @dblclick="editing = true"></label>
      <md-button class="md-raised md-warn" @click="deleteTodo({ todo: todo })">X</md-button>
    </div>

    <input type="text" class="edit" v-show="editing" v-focus="editing" :value="todo.text" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit" />
  </li>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    // Options / Data
    data() {
      return {
        // a component data to indicate its state
        editing: false,
      };
    },
    props: ['todo'],
    // propsData: {},
    // computed: {},
    methods: {
      // Todo component now has access to injected appStore instance's mutation methods
      ...mapMutations([
        'editTodo',
        'toggleTodo',
        'deleteTodo',
      ]),
      cancelEdit(e) {
        // Reset the current DOM text value from todo JSON data
        const targetEvent = e;
        targetEvent.target.value = this.todo.text;
        this.editing = false;
      },
      doneEdit(e) {
        const targetEvent = e;
        const value = targetEvent.target.value.trim();

        // Grabbing the props??? I think
        const { todo } = this;

        // If there is no text after editing
        if (!value) {
          this.deleteTodo({ todo });
        } else if (this.editing) {
          // If todo is still being edited, then react the text change immediately
          this.editTodo({ todo, value });
          this.editing = false;
        }
      },
    },
    // watch: {},
    // Options / DOM
    // el () {},
    // template: '',
    // render () {},
    // Options / Lifecycle Hooks
    // beforeCreate () {},
    // created () {},
    // beforeMount () {},
    // mounted () {},
    // beforeUpdate () {},
    // updated () {},
    // activated () {},
    // deactivated () {},
    // beforeDestroy () {},
    // destroyed () {},
    // Options / Assets
    directives: {
      focus(el, { value }, { context }) {
        if (value) {
          context.$nextTick(() => {
            el.focus();
          });
        }
      },
    },
    // filters: {},
    // components: {},
    // Options / Misc
    // parent: null,
    // mixins: [],
    name: 'todo',
    // extends: {},
    // delimiters: [ '{{', '}}' ],
    // functional: false
  };
</script>

<style lang="scss" scoped>
  button.md-button {
    min-width: 32px;
  }
</style>
