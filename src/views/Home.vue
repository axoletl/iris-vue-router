<template>
    <div class="home">
        <div class="container">
            <h2>Home</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum doloribus optio dolor quia. Voluptatum
                inventore laboriosam nihil ipsum! Atque nihil iste nostrum sapiente a numquam dolores magni deleniti
                molestias labore.
            </p>
            <Component />
            <img src="@/assets/images/test.png" alt="Test image">
        </div>
    </div>
</template>
<script>
import Component from '@/components/Component.vue'

export default {
    name: "Home",
    components: {
        Component,
    }
}
</script>
<style lang="scss">
.home {}
</style>