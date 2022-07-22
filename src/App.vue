<template>
  <MainCanvas />
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
@use "./styles/reset.scss";
#app {
}
</style>