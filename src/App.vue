<template>
  <Canvas />
</template>

<script>
import Canvas from './components/Canvas.vue'
export default {
  name: "App",
  components: {
    Canvas,
  },
  methods: {

  }
};
</script>

<style lang="scss">
@use "./styles/reset.scss";
#app {
}
</style>