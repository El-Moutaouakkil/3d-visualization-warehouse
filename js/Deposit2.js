
(function ($) {
  var defaults = {
    renderer: null,
    scene: null,
    camera: null,
    
  }

  var methods = {
    init: () => {
      let content = '<div>' +
            '<h1>This is an H1 Element.</h1>' +
            '<span class="large">Hello Three.js cookbook</span>' +
            '<textarea> And this is a textarea</textarea>' +
            '</div>';
      defaults.scene = new THREE.Scene()
      defaults.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      defaults.camera.position.x = 2.5
      defaults.camera.position.y = -0.5
      defaults.camera.position.z = 500
      defaults.camera.lookAt(defaults.scene.position)
      
      // create a CSS3DRenderer
      defaults.renderer = new THREE.CSS3DRenderer()
      defaults.renderer.setSize(window.innerWidth, window.innerHeight)
      
      // add the output of the renderer to the html element
      document.body.appendChild(defaults.renderer.domElement);

      // let cssElement = methods.createCSS3DObject(content);
      let cssElement = methods.createButton("click me !")
      cssElement.position.set(1, 1, 1);
      defaults.scene.add(cssElement);
      let controls = new THREE.OrbitControls(
        defaults.camera,
        defaults.renderer.domElement
      )
      //call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        controls.update()
        methods.render();
      //Note: Event click after rendering objects
      document.querySelector('#btn').addEventListener('click', () => {
        alert('Button clicked!')
    });
    },

    createButton: (content) =>{
      let button = document.createElement('button')
      button.innerHTML = content
      button.id = "btn"
      let object = new THREE.CSS3DObject(button)
      return object;
    },

    createCSS3DObject: (content) => {
      // convert the string to dome elements
      let wrapper = document.createElement('div')
      wrapper.innerHTML = content
      let div = wrapper.firstChild
      // set some values on the div to style it.
      // normally you do this directly in HTML and
      // CSS files.
      div.style.width = '370px'
      div.style.height = '370px'
      div.style.opacity = 0.7
      div.style.background = new THREE.Color(
        Math.random() * 0xffffff
      ).getStyle()
      // create a CSS3Dobject and return it.
      let object = new THREE.CSS3DObject(div)
      return object
    },

    render: () => {
      // and render the scene
      defaults.renderer.render(defaults.scene, defaults.camera)
    },
  }

  $.fn.Deposit = function (options) {
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
