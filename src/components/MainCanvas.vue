<template>
  <div class="canvas" ref="canvas"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
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
      // alpha: true,
      antialias: true,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.debug.checkShaderErrors = true
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.physicallyCorrectLights = true
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.shadowMap.enabled = false

    //disable when not using srgb maps
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1

    this.composer = new EffectComposer(this.renderer)

    this.scene = new THREE.Scene()
    // this.scene.background = null
    const self = this
    new RGBELoader().load("./assets/images/hdri1.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping
      self.scene.environment = texture
      self.scene.background = texture
    })

    this.camera = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.01,
      100
    )
    this.camera.position.z = 5
    this.scene.add(this.camera)

    this.light1 = new THREE.DirectionalLight('rgb(255,0,0)')
    this.light1.position.set(2, 0.5, 0)
    this.light1.intensity = 4
    this.scene.add(this.light1)

    this.light2 = new THREE.DirectionalLight('rgb(0,0,255)')
    this.light2.position.set(-2, -0.5, 0)
    this.light2.intensity = 4
    this.scene.add(this.light2)

    this.cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        roughness: 0,
      })
    )
    this.scene.add(this.cube)

    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(3, 3, 1),
      new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        map: new THREE.TextureLoader().load('../assets/images/test.png'),
        roughness: 1,
      })
    )
    this.plane.position.y = -1
    this.plane.rotation.x = -Math.PI / 2
    this.scene.add(this.plane)

    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    //debug
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.autoRotate = true
    this.stats = new Stats()
    this.stats.dom.style.left = 'unset'
    this.stats.dom.style.right = '0px'
    document.body.appendChild(this.stats.dom)
  },
  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()

    window.addEventListener('resize', this.resize)
  },
  methods: {
    animate() {
      this.update()
      this.debug()
      this.render()

      requestAnimationFrame(this.animate)
    },
    update() {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
      this.cube.rotation.z += 0.01
    },
    debug() {
      this.controls.update()
      this.stats.update()
    },
    render() {
      // this.renderer.render(this.scene, this.camera)
      this.composer.render()
    },
    resize() {
      // this.sizes.width = window.innerWidth
      // this.sizes.height = window.innerHeight
      this.sizes.width = this.$refs.canvas.clientWidth //WIP, still some initial popping? and canvas is cut when address bar shown
      this.sizes.height = this.$refs.canvas.clientHeight

      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

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
  z-index: -1;
  pointer-events: none;
  user-select: none;

  > canvas {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
