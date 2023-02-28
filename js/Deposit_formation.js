(function ($) {
  let defaults = {
    scene: null,
    x: 0,
    y: 0,
    z: 0,
  };

  let methods = {
    init: function (dv_id) {
      defaults.scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor("white");
      $(dv_id).append(renderer.domElement);
      methods.createCubesX(4);
      camera.position.z = 5;
      methods.animate(renderer, camera);
    },

    createCube: () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: "black",
        wireframe: true,
      });
      const cube = new THREE.Mesh(geometry, material);
      // defaults.x = defaults.x - 5;
      cube.position.x = defaults.x;
      defaults.scene.add(cube);
    },

    createCubesX: function (cubeCountX) {
      for (let i = 0; i < cubeCountX; i++) {
        defaults.x = i;
        methods.createCube();
      }
    },
    
    animate: function (renderer, camera) {
      renderer.render(defaults.scene, camera);
    },
  };

  $.fn.Deposit = function (options) {
    if (methods[options]) {
      return methods[options].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof options === "object" || !options) {
      return methods.init.apply(this, arguments);
    }
  };
})(jQuery);
