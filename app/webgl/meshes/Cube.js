import * as THREE from 'three';

class Cube {
  constructor(scene){
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: false } );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  };

  updateRotation=()=>{
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  };
  
};

export default Cube;
