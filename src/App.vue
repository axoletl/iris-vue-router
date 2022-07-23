<template>
  <header>
    <div
      class="b-container"
      style="
        margin-top: 2rem;
        margin-bottom: 2rem;
      "
    >
      <h1>Iris Three + Vue Starter</h1>
      <br />
      <h2>(+Webpack and Sass)</h2>
    </div>
  </header>
  <main>
    <MainCanvas />
    <div class="b-container">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
    </div>
    <div
      class="b-container"
      style="
        height: 200vh;
        border: 1px solid black;
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
      "
    >
      <h3>Scroll test DIV</h3>
    </div>
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
@import "./styles/vars.scss";
@import "./styles/reset.scss";
@import "./styles/typography.scss";

.b-container {
  max-width: $b-lg;
  margin: 0 auto;

  @media (max-width: $b-lg) {
    margin: 0 2rem;
  }
}
</style>