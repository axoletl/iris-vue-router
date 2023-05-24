<template>
  <header>
    <div class="container">
      <h1>Iris Vue Router Starter</h1>
      <h2>(+Webpack and Sass)</h2>
    </div>
  </header>
  <router-view></router-view>
  <footer></footer>
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    methods: {

    }
}
</script>

<style lang="scss">
@import "@/styles/reset.scss";
@import "@/styles/base.scss";
@import "@/styles/typography.scss";
</style>