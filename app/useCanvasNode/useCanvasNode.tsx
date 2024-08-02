import { useEffect, useState, MutableRefObject } from 'react';
import WebGLCameraViewRenderer from '../webgl/WebGLCameraViewRenderer';

interface UseCanvasNodeProps {
  sceneObject: any;
  domNode: MutableRefObject<HTMLDivElement | null>;
  parentDimensions: DOMRect | null | undefined;
}

const useCanvasNode = ({ sceneObject, domNode, parentDimensions }: UseCanvasNodeProps) => {
  const [view, setView] = useState<WebGLCameraViewRenderer | null>(null);

  useEffect(() => {
    if (sceneObject && domNode) {
      setView(new WebGLCameraViewRenderer({ domNode, sceneObject }));
    }
  }, [domNode, sceneObject]);

  useEffect(() => {
    parentDimensions && view && view.init(parentDimensions);
  }, [view, parentDimensions]);

  useEffect(() => {
    parentDimensions && view && view.updateDims(parentDimensions);
  }, [view, parentDimensions]);
};

export default useCanvasNode;
