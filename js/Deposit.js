(function ($) {
  let defaults = {
    renderer: null,
    scene: null,
    camera: null,
  }

  let methods = {
    init: () => {
      // create a scene, that will hold all our elements
      // such as objects, cameras and lights.
      defaults.scene = new THREE.Scene()
      // create a camera, which defines where we looking at.
      defaults.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      // position and point the camera to the center
      defaults.camera.position.x = 15
      defaults.camera.position.y = 16
      defaults.camera.position.z = 13
      defaults.camera.lookAt(defaults.scene.position)
      // create a renderer, set the background color and size
      defaults.renderer = new THREE.WebGLRenderer()
      defaults.renderer.setClearColor(0x000000, 1.0)
      defaults.renderer.setSize(window.innerWidth, window.innerHeight)
      // create a cube and add to scene
      let cubeGeometry = new THREE.BoxGeometry(
        10 * Math.random(),
        10 * Math.random(),
        10 * Math.random()
      )
      //
      let cubeMaterial = new THREE.MeshNormalMaterial()
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      defaults.scene.add(cube)
      // add the output of the renderer to the html element
      document.body.appendChild(defaults.renderer.domElement)
      // call the render function
      defaults.renderer.render(defaults.scene, defaults.camera)
    },
  }

  $.fn.Deposite = function (options) {
    if (methods[options]) {
      return methods[options].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      )
    } else if (typeof options === 'object' || !options) {
      return methods.init.apply(this, arguments)
    }
  }
})(jQuery)
