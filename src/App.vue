<template>
  <header>
    <h1>Iris Three + Vue Starter</h1><br>
	<h2>(+Webpack and Sass)</h2>
  </header>
  <main>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum
    </p>
    <MainCanvas />
	<div style="height: 200vh"></div>
  </main>
  <footer></footer>
</template>

<script>
import MainCanvas from './components/MainCanvas.vue'
export default {
  name: 'App',
  components: {
    MainCanvas,
  },
  methods: {

  }
}
</script>

<style lang="scss">
@use "./styles/vars.scss";
@use "./styles/reset.scss";
@use "./styles/typography.scss";
</style>