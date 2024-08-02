import * as THREE from 'three';

// @ts-ignore
import vertexShader from '!!raw-loader!./shaders/vertexShader.glsl';
//@ts-ignore
import fragmentShader from '!!raw-loader!./shaders/fragmentShader.glsl';

import { ControlPanelState } from '../ControlPanel';

interface IUniformVals extends THREE.IUniform {
  value: number;
}

interface IUniformsObj {
  uTime: THREE.IUniform;
  uBigWavesElevation: IUniformVals;
  [key: string]: THREE.IUniform;
}

export interface SceneInterface {
  clock: THREE.Clock;
  scene: THREE.Scene;
  cameraView: any | undefined;
  uniforms: IUniformsObj;
  updateUniforms: (incomingUniforms: ControlPanelState) => void;
  addCameraViewRenderer: (incomingView: any) => void;
}

class Scene implements SceneInterface {
  clock: THREE.Clock;
  scene: THREE.Scene;
  cameraView: any | undefined;
  uniforms: IUniformsObj;
  planeGeometry?: THREE.PlaneGeometry;
  water?: THREE.Mesh;

  constructor() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();

    this.uniforms = {
      uTime: { value: 0 },
      uBigWavesElevation: { value: 0.2 },
      uBigWavesFrequency: { value: [0.2, 0.2]},
      uBigWavesSpeed: { value: 1.0},
      uHeightColour: { value: new THREE.Color('white')},
      uDepthColour: { value: new THREE.Color('blue')},
      uColourOffset: { value: 0.25},
      uColourMultiplier: { value: 2.0},
      uSmallWavesElevation: { value: 0.15},
      uSmallWavesFrequency: { value: 3.0},
      uSmallWavesIterations: { value: 4.0},
      uSmallWavesSpeed: { value: 0.15}
    };

    this.init();
  }

  init(): void {
    this.render();
  }

  addCameraViewRenderer = (incomingView: any): void => {
    this.cameraView = incomingView;
    this.createGeometry();
  };

  createGeometry = ():void => {
    this.planeGeometry = new THREE.PlaneGeometry(2, 2, 500, 500);

    const shader = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide, // Make the material double-sided
      transparent: true,
      uniforms: this.uniforms, 
    });

    this.water = new THREE.Mesh(this.planeGeometry, shader);
    this.water.rotation.x = 1.9;
    this.scene.add(this.water);
  };

  updateUniforms = (incomingUniforms: ControlPanelState):void => {
    this.uniforms.uBigWavesElevation.value = incomingUniforms.bigWavesElevation;
    this.uniforms.uBigWavesFrequency.value = incomingUniforms.bigWavesFrequency;
    this.uniforms.uBigWavesSpeed.value = incomingUniforms.bigWavesSpeed;
    this.uniforms.uHeightColour.value = new THREE.Color(incomingUniforms.heightColour);
    this.uniforms.uDepthColour.value = new THREE.Color(incomingUniforms.depthColour);
    this.uniforms.uColourOffset.value = incomingUniforms.colourOffset;
    this.uniforms.uColourMultiplier.value = incomingUniforms.colourMultiplier;
    this.uniforms.uSmallWavesElevation.value = incomingUniforms.smallWavesElevation;
    this.uniforms.uSmallWavesIterations.value = incomingUniforms.smallWavesIterations;
    this.uniforms.uSmallWavesSpeed.value = incomingUniforms.smallWavesSpeed;
    this.uniforms.uSmallWavesFrequency.value = incomingUniforms.smallWavesFrequency;
    if(this.water){
      this.water!.rotation.x = incomingUniforms.rotation; 
    }
  };


  render = (): void => {
    requestAnimationFrame(this.render);
    if (this.clock) {
      const elapsedTime = this.clock.getElapsedTime();
      this.cameraView?.animate(elapsedTime);
      this.uniforms.uTime.value = elapsedTime;
    }
  };
}

export default Scene;
