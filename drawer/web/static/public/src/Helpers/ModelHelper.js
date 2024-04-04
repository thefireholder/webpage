// import * as THREE from 'three'
// import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scenePath = 'static/public/models/scene.gltf'

export const LoadGLTFByPath = (scene, camera) => {
    return new Promise((resolve, reject) => {
      // Create a loader
      const loader = new GLTFLoader();
  
      // Load the GLTF file
      loader.load(scenePath, (gltf) => {

        scene.add(gltf.scene);
        camera = gltf.cameras[0]

        // print list and camera
        console.log(gltf.cameras)
        console.log(camera)

        resolve();
      }, undefined, (error) => {
        reject(error);
      });
    });
};