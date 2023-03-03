/* This is the entry point for our plugin
calling this plugin on a jquery object will create a 3d supermarket scene with three js. For now this supermarket will be a set of aisles with a a predefined number of levels and a set number of blocks per level. The blocks will be cubes with a random color and a random product assigned to them. In the future we could get the product's data from the server (database, json file, etc.). 
*/

(function ($) {
    // console.log("hello world");
    // Define the plugin name and default options
    const defaults = {
        sceneWidth: window.innerWidth,
        sceneHeight: window.innerHeight,
    };

    eventHandlers = {
        adjustSceneSize: function (renderer, camera) {
            const currentSceneWidth = window.innerWidth;
            const currentSceneHeight = window.innerHeight;
            camera.aspect = currentSceneWidth / currentSceneHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentSceneWidth, currentSceneHeight);
        },
    };
    const methods = {
        initScene: function () {
            //initialization
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                75,
                defaults.sceneWidth / defaults.sceneHeight,
                0.1,
                1000
            );

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(defaults.sceneWidth, defaults.sceneHeight);
            // renderer.setClearColor("#e3e3e3");
            this.append(renderer.domElement); //add the renderer to the jquery object calling this function

            return { scene, camera, renderer };
        },
        createBlock: function (aisleAddress, levelAddress, blockAddress) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({
                color: "crimson",
                wireframe: true,
            });
            const block = new THREE.Mesh(geometry, material);
            // assign an address to the block
            const { userData } = block;
            userData.address = `A${aisleAddress}L${levelAddress}B${blockAddress}`;
            // console.log({ userData });

            userData.product = getFakeProduct();

            return block;
        }, 
        createLevel: function (
            numBlocks,
            yPos,
            zPos,
            aisleAddress,
            levelAddress
        ) {
            const colors = ["crimson", "green", "blue", ""];
            const levelColor =
                colors[Math.floor(Math.random() * colors.length)];
            const level = new THREE.Group();
            for (let i = 0; i < numBlocks; i++) {
                const block = methods.createBlock(
                    aisleAddress,
                    levelAddress,
                    i
                );
                block.position.x = i - numBlocks / 2;
                block.position.y = yPos;
                block.position.z = zPos;
                // block.material.color.set(levelColor);
                level.add(block);
            }
            const { userData } = level;
            userData.address = `A${aisleAddress}.S${levelAddress}`;
            return level;
        },
        createAisle: function (
            numLevels,
            numBlocksPerLevel,
            spacing,
            zPos,
            aisleAddress
        ) {
            const aisle = new THREE.Group();

            for (let i = 0; i < numLevels; i++) {
                const yPos = i * spacing - numLevels / 2;
                const level = this.createLevel(
                    numBlocksPerLevel,
                    yPos,
                    zPos,
                    aisleAddress,
                    i
                );
                aisle.add(level);
                const { userData } = aisle;
                userData.address = `A${aisleAddress}`;
            }

            return aisle;
        },
        createMultipleAisles: function (
            numAisles,
            numLevels,
            numBlocksPerLevel,
            aisleSpacing,
            aisleZSpacing
        ) {
            const supermarket = new THREE.Group();
            for (let i = 0; i < numAisles; i++) {
                const zPos = i * aisleZSpacing;
                const aisle = methods.createAisle(
                    numLevels,
                    numBlocksPerLevel,
                    aisleSpacing,
                    zPos
                );
                // aisle.position.set(i,-1,0);
                supermarket.add(aisle);
            }
            supermarket.userData.numAisles = numAisles;
            return supermarket;
        },
    };

    $.fn.supermarket3d = function () {
        // init the scene
        const $this = $(this);
        const { scene, camera, renderer } = methods.initScene.call($this);

        // const supermarket = methods.createMultipleAisles(5, 4, 10, 1, 1.5);
        // scene.add(supermarket);

        camera.position.z = 4;
        scene.add(camera);
        // Find the block with address "A0L0B0"
        let block;
        scene.traverse((child) => {
            if (child.userData.address === "A0L0B0") {
                block = child;
            }
        });

        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        // Rendering the scene
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // Event listeners
        $(window).on("resize", () => {
            eventHandlers.adjustSceneSize(renderer, camera);
        });
    };
})(jQuery);
