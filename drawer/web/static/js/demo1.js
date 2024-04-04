// demo1.js

var camera, scene, renderer;
var geometry, material, box;


init();
animate();

function init() {

    // create background
	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry();
	material = new THREE.MeshNormalMaterial();
	box = new THREE.Mesh( geometry, material );
    scene.add( box );

    geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
	box2 = new THREE.Mesh( geometry, material );
    box2.position.y=2;
    scene.add( box2 );
    
    var fov = 70; //field of view = extent of scene seen
    var aspect = window.innerWidth / window.innerHeight; // always width / height as in TV
    var near = 0.10; // limit for rendering
    var far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 4;

    // bootstrap
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight ); // smaller for smaller window
	document.body.appendChild( renderer.domElement ); // append this renderer to html's body. creates canvas element

}

//animate loop required to render (or renderer.render required (also not waste battery when on different page))
function animate() { 
	requestAnimationFrame( animate ); //recursive
    // all the updates
    updateValues()
	renderer.render( scene, camera );
}

function updateValues() {
	box.rotation.x += 0.01;
	box2.rotation.y += 0.02;
}