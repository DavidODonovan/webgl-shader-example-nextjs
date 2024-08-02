import * as THREE from 'three';

class Plane {
  constructor(scene){
    this.scene = scene;
    this.geometry = new THREE.PlaneGeometry(20, 20, 5, 5);
    this.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide, 
      wireframe: false,
      flatShading: true,
      vertexColors: true 
    });


    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    console.log('here are some attributes: ', this.geometry.attributes);
    let colors = [];
    const vertexGroupCount = this.geometry.attributes.position.count;
    for(let i = 0; i<vertexGroupCount; i++){
      colors.push(0,0,0);
    };
    this.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

    const verticesArr = this.geometry.attributes.position.array;

    for(let i = 0; i < verticesArr.length; i++){
      const x = verticesArr[i];
      const y = verticesArr[i + 1];
      const z = verticesArr[i + 2];
      
      verticesArr[i] = x + Math.random()/2;
      verticesArr[i+1] = y + Math.random()/2;
      verticesArr[i+2] = z + Math.random()/2;
    }

  };

  updateRotation=()=>{
    // this.mesh.rotation.x -= 0.01;
  };
};

export default Plane;