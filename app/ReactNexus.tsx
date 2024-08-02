'use client';

import { useEffect, useState } from 'react';
import { useDims } from './useDims';
import Scene, { SceneInterface } from './webgl/Scene';
import useCanvasNode from './useCanvasNode/useCanvasNode';
import ControlPanel from './ControlPanel';

const ReactNexus = () => {
  const [domNode, parentDimensions] = useDims();
  let [sceneObject, setSceneObject] = useState<SceneInterface | null>(null);

  useEffect(()=>{
    console.log({parentDimensions})
  }, [parentDimensions])

  useEffect(() => {
    const newScene = new Scene();
    setSceneObject(newScene);
  }, []);

  useCanvasNode({ sceneObject, domNode, parentDimensions });

  return (
    <div className="pt-4 flex flex-col md:flex-row items-center">
      <div ref={domNode} className="relative w-full h-64 md:h-96" />
      {sceneObject && <ControlPanel sceneObject={sceneObject} />}
    </div>
  );
};

export default ReactNexus;
