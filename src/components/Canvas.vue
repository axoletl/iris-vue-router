<template>
  <div class="canvas" ref="canvas"></div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'Canvas',

  created() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')
    this.cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        color: 'hsl(0, 100%, 50%)',
      })
    )

    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.light.position.set(0, 0, 10)
    this.camera.position.z = 5
    this.scene.background = new THREE.Color('hsl(0, 100%, 100%)')
  },
  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()
  },
  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera)
      this.cube.rotation.y += 0.02

      requestAnimationFrame(this.animate)
    }
  },
}
</script>

<style lang="scss">
</style>
