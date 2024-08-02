import * as THREE from 'three';

class DirectionalLight {
  constructor(scene, positionConfig = { x: 0, y: 0, z: 0}){
    const { x, y, z } = positionConfig
    this.scene = scene;
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(this.light);
    this.light.position.set(x,y,z);
    // const cameraHelper = new THREE.CameraHelper(this.light.shadow.camera);
    // this.scene.add(cameraHelper);
  };

  updateLight=(newVals)=>{
    const { color, intensity } = newVals;

    this.light.color = new THREE.Color(color);
    this.light.intensity = intensity;

    this.light.position.x = newVals.position.x;
    this.light.position.y = newVals.position.y;
    this.light.position.z = newVals.position.z;
  };

};

export default DirectionalLight;
