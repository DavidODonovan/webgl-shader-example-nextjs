import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SceneInterface } from './Scene';

type Dims = DOMRect;
interface IWebGLCameraViewRenderer {
  init(dims: Dims): void;
  camera: THREE.PerspectiveCamera;
  animate(n: number): void;
  updateDims(dims: Dims): void;
}
interface ConstructorParams {
  domNode: React.RefObject<HTMLDivElement>;
  sceneObject: SceneInterface;
}

class WebGLCameraViewRenderer implements IWebGLCameraViewRenderer {
  domNodeCurrent: HTMLDivElement | null;
  sceneObject: SceneInterface;
  newCanvas: HTMLCanvasElement | OffscreenCanvas | undefined;
  canvas!: HTMLCanvasElement | OffscreenCanvas | undefined;
  dims!: { width: number; height: number };
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  clock!: THREE.Clock;

  constructor(params: ConstructorParams) {
    this.domNodeCurrent = params.domNode.current;
    this.sceneObject = params.sceneObject;
    this.newCanvas = document.createElement('canvas');

    if (this.domNodeCurrent) {
      this.canvas = this.domNodeCurrent.appendChild(this.newCanvas);
      this.canvas.style.position = 'absolute';
      this.canvas.style.width = '100%';
      this.canvas.style.outline = 'none';
    }

    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.updateDims = this.updateDims.bind(this);
  }

  // this is a comment
  init(dims: Dims): void {
    if (dims === undefined || dims.width === null || dims.height === null) {
      console.error('Invalid dimensions provided to init(): ', dims);
      return;
    }
    this.dims = dims;
    console.log("okay", this.dims)
    this.scene = this.sceneObject.scene;
    this.sceneObject.addCameraViewRenderer(this);

    this.camera = new THREE.PerspectiveCamera(75, this.dims.width / this.dims.height, 0.1, 1000);
    this.camera.position.set(0.4, 1.75, -0.05);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true
    });

    this.renderer.setSize(this.dims.width, this.dims.height);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.clock = new THREE.Clock();
  }

  animate(n: number): void {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  countMeshesInScene(scene: any) {
    // let meshCount = 0;

    // function traverseScene(object: any) {
    //   if (object.isMesh) {
    //     meshCount++;
    //   }

    //   for (let i = 0; i < object.children.length; i++) {
    //     traverseScene(object.children[i]);
    //   }
    // }

    // traverseScene(scene);

  }

  updateDims(dims: Dims): void {
    this.countMeshesInScene(this.scene)
    if (dims) {
      this.dims = {
        width: dims.width,
        height: dims.height
      };
      this.camera.aspect = this.dims.width / this.dims.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.dims.width, this.dims.height);
    }
  }
}

export default WebGLCameraViewRenderer;
