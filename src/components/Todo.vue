<template>
</template>

<script>
  import mapMutations from 'vuex';

  export default {
    // Options / Data
    data () {
      return {
        // a component data to indicate its state
        editing: false
      }
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
      cancelEdit (e) {
        // Reset the current DOM text value from todo JSON data
        e.target.value = this.todo.text;
        this.editing = false;
      },
      doneEdit (e) {
        const value = e.target.value.trim();

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
      focus (el, { value }, { context }) {
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
  }
</script>

<style lang="scss" scoped>
</style>
