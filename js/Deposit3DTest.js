(function ($) {
  let defaults = {
    marginBetweenCubes: 0,
    cubeCountBeforeMargin: 0,
    cubeCountX: 5,
    cubeCountY: 3,
    zPosition: 1.4,
    drivewayCount: 3,
    data: [],
    scene: null,
    camera: null,
    renderer: null,
    domEvent: null,
    geometry: [],
    material: [],
    xPosition: -4,
    yPosition: -3,
    zValue: -2,
    cubesX: [],
    cubesY: [],
    controls: null,
    cpt: 0,
    cube: null,
    emplacements: [
      {
        id: 1,
        name: "a1",
      },
      {
        id: 2,
        name: "a2",
      },
      {
        id: 3,
        name: "a3",
      },
      {
        id: 4,
        name: "a4",
      },
      {
        id: 5,
        name: "a5",
      },
      {
        id: 6,
        name: "a6",
      },
    ],
  };

  let methods = {
    init: function () {
      methods.initScene();
    },

    initScene: function () {
      defaults.scene = new THREE.Scene();

      defaults.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("dv_deposit").appendChild(renderer.domElement);
      renderer.setClearColor("gray");
      methods.createZone(defaults.drivewayCount);

      const gui = new dat.GUI();
      const cubeFolder = gui.addFolder("Cube");
      cubeFolder.add(defaults.cubesX[0].rotation, "x", 0, Math.PI * 2);
      cubeFolder.open();
      const cameraFolder = gui.addFolder("Camera");
      cameraFolder.add(defaults.camera.position, "z", 0, 10);
      cameraFolder.open();

      defaults.camera.position.x = 2.5;
      defaults.camera.position.y = -0.5;
      defaults.camera.position.z = 5;
      let controls = new THREE.OrbitControls(
        defaults.camera,
        renderer.domElement
      );

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(defaults.scene, defaults.camera);
      }
      animate();
    },

    createDriveWay: (cubeCountX, cubeCountY, zPosition) => {
      //cubeCountX: nombre de cube dans l'axe x
      //cubeCountY: nombre de cube dans l'axe y
      //cubeCountZ: nombre de cube dans l'axe z
      for (let i = 0; i < cubeCountX; i++) {
        defaults.cubesX[i] = methods.createCube();

        //position
        defaults.xPosition =
          i % defaults.cubeCountBeforeMargin == 0
            ? defaults.xPosition + 1 + defaults.marginBetweenCubes
            : defaults.xPosition + 1; // this condition for make a margin between each two cubes
        defaults.cubesX[i].position.x = defaults.xPosition;
        defaults.cubesX[i].position.z = zPosition;
        //add in scene
        defaults.scene.add(defaults.cubesX[i]);

        for (let j = 0; j < cubeCountY; j++) {
          defaults.cubesY[i] = methods.createCube();
          defaults.cubesY[i].position.x = defaults.cubesX[i].position.x;
          defaults.cubesY[i].position.y = ++defaults.yPosition;
          defaults.cubesY[i].position.z = defaults.cubesX[i].position.z;
          defaults.scene.add(defaults.cubesY[i]);
        }

        defaults.yPosition = -3;
      }
      defaults.xPosition = -4;
    },

    createZone: function (drivewayCount) {
      //Zone: represente plusieurs allés
      for (let i = 0; i < drivewayCount; i++) {
        let { cubeCountX, cubeCountY, zPosition } = defaults || {};
        if (i !== 0) {
          zPosition -= eval(1.4 * i);
        }
        methods.createDriveWay(cubeCountX, cubeCountY, zPosition);
      }
    },

    createTransparentCube: () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const edgesGeometry = new EdgesGeometry.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: "black",
        linewidth: 40,
        linecap: "round", //ignored by WebGLRenderer
        linejoin: "round",
      });
      return new THREE.LineSegments(edgesGeometry, material);
    },

    createCube: () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      const material = new THREE.MeshBasicMaterial({
        color: "black",
        wireframe: true,
      });
      const cube = new THREE.Mesh(geometry, material);
      return cube;
    },

    createButton: (content) => {
      let button = document.createElement("button");
      button.innerHTML = content;
      button.id = "btn";
      let object = new THREE.CSS3DObject(button);
      return object;
    },
  };

  $.fn.Deposit3DTest = function (options) {
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
