import * as THREE from 'three';

class Uniforms {
  constructor(incomingDims){
    this.u_color = { value: new THREE.Color(0x001299) };
    this.u_time = { value: 0.0 };
    this.u_mouse = { value:{ x:0.0, y:0.0 }};
    this.u_resolution = { value:{ x:0, y:0 }};

    this.updateResolution(incomingDims);
  };

  updateMouse=(newMouse)=>{
    this.u_mouse.value = newMouse;
  };

  updateResolution=(newDims)=>{
    this.u_resolution.value.x = newDims.width;
    this.u_resolution.value.y = newDims.height;
  };

};

export default Uniforms;
