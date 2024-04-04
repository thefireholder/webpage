// import * as THREE from 'three'
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


//Renderer does the job of rendering the graphics
let renderer = new THREE.WebGLRenderer({

	//Defines the canvas component in the DOM that will be used
	canvas: document.querySelector('#background'),
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 

// preparing loading:
// const scenePath = 'static/public/models/scene.gltf'
const scenePath = 'static/public/models/miclightcam.glb'
const scene = new THREE.Scene();
let cameraList = [];
let camera;
let originalCamPos;


const LoadGLTFByPath = (scene) => {
    return new Promise((resolve, reject) => {
      // Create a loader
      const loader = new GLTFLoader();
  
      // Load the GLTF file
      loader.load(scenePath, (gltf) => {
        scene.add(gltf.scene);
        resolve();
      }, undefined, (error) => {
        reject(error);
      });
    });
};

// Load the GLTF model
LoadGLTFByPath(scene)
  .then(() => {
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error('Error loading JSON scene:', error);
  });

//retrieve list of all cameras
function retrieveListOfCameras(scene){
  // Get a list of all cameras in the scene
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });

  //Set the camera to the first value in the list of cameras
  console.log('cameraList')
  console.log(cameraList)
  camera = cameraList[0];
  console.log('camera')
  console.log(camera)
  updateCameraAspect(camera);
  

  originalCamPos = [camera.position.x, camera.position.y, camera.position.z]

  // Start the animation loop after the model and cameras are loaded
  animate();
}

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

//  mouse move controller
let mousePos = [0, 0]
onmousemove = function(e){
  mousePos[0] = e.clientX / window.innerWidth - 0.5
  mousePos[1] = e.clientY / window.innerHeight - 0.5
}

let fly = true
let i = 0
let v = 0.004
//A method to be run each time a frame is generated
function animate() {
  requestAnimationFrame(animate);

  // console.log(camera.position.y)

  if (fly) {
    if (i < 0) i += v
    else fly = false
  }
  else {
    if (i > -0.5) i -= v
    else fly = true
  }
  camera.position.y = originalCamPos[1] - i
  // console.log(mousePos)

  // // horizontal
  // camera.position.x = originalCamPos[0] - mousePos[0] - 0.3
  // camera.position.z = originalCamPos[2] + mousePos[0]
  // // vertical
  // camera.position.y = originalCamPos[1] + mousePos[1] + 0.3
  
  
  renderer.render(scene, camera);
};




    