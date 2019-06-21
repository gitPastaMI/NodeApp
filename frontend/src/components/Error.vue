<template>
  <div class="" v-if="(errors)">
    {{errors}}
    {{errors.name}}
    <div class="" v-for="item in errors">
      {{item.type}}
      {{item.message}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['errors'],
  data () {
    return {
      // error: this.errorProp,
    }
  },
}
</script>

<style scoped>
div {
  color: crimson;
}
</style>
