<template>
  <div class="canvas" ref="canvas"></div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default {
  name: 'MainCanvas',

  created() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.debug.checkShaderErrors = false
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.physicallyCorrectLights = false
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.shadowMap.enabled = false
    this.composer = new EffectComposer(this.renderer)

    this.scene = new THREE.Scene()
    this.scene.background = null

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )
    this.camera.position.z = 5

    this.light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')
    this.light.position.set(0, 0, 10)

    this.cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        map: new THREE.TextureLoader().load('../assets/images/test.png'),
      })
    )

    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass)
  },
  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()

    window.addEventListener('resize', this.resize)
  },
  methods: {
    animate() {
      this.update()
      this.render()

      requestAnimationFrame(this.animate)
    },
    update() {
      this.cube.rotation.y += 0.02
      this.cube.rotation.x += 0.02
    },
    render() {
      // this.renderer.render(this.scene, this.camera)
      this.composer.render()
    },
    resize() {
      // Update sizes
      // this.sizes.width = window.innerWidth
      // this.sizes.height = window.innerHeight
      this.sizes.width = this.$refs.canvas.clientWidth //WIP, still some initial popping? and canvas is cut when address bar shown
      this.sizes.height = this.$refs.canvas.clientHeight

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    },
  },
}
</script>

<style lang="scss">
.canvas {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  user-select: none;

  > canvas {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
