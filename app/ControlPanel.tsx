import React, { useReducer, useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { IconWaveSine, IconArrowsMoveVertical, IconArrowUp, IconArrowDown, IconBrandSpeedtest, IconPalette, IconMultiplier2x, IconArrowIteration } from '@tabler/icons-react';
import { SceneInterface  } from './webgl/Scene'

export interface ControlPanelState {
  bigWavesElevation: number;
  bigWavesFrequency: number[];
  bigWavesSpeed: number;
  heightColour: string;
  depthColour: string;
  colourOffset: number;
  colourMultiplier: number;
  smallWavesElevation: number;
  smallWavesIterations: number;
  smallWavesFrequency: number;
  smallWavesSpeed: number;
  rotation: number;
};

const SET_BIG_WAVES_ELEVATION = "set_bw_elev", 
      SET_BIG_WAVES_FREQ_X = "set_bw_freq_x", 
      SET_BIG_WAVES_FREQ_Y = "set_bw_freq_y",
      SET_BIG_WAVES_SPEED = "set_bw_speed",
      SET_HEIGHT_COLOUR = "set_height_colour",
      SET_DEPTH_COLOUR = "set_depth_colour",
      SET_COLOUR_OFFSET= "set_colour_offset",
      SET_COLOUR_MULTIPLIER= "set_colour_multiplier",
      SET_SMALL_WAVES_SPEED = "set_small_waves_speed",
      SET_SMALL_WAVES_ITERATIONS = "set_small_waves_iterations",
      SET_SMALL_WAVES_ELEVATION = "set_small_waves_elevation",
      SET_SMALL_WAVES_FREQUENCY = "set_small_waves_frequency",
      SET_ROTATION = "set_rotation"
      ;

type Action = {type: typeof SET_BIG_WAVES_ELEVATION, payload: number} | 
              {type: typeof SET_BIG_WAVES_FREQ_X, payload: number} |
              {type: typeof SET_BIG_WAVES_FREQ_Y, payload: number} |
              {type: typeof SET_BIG_WAVES_SPEED, payload: number} |
              {type: typeof SET_HEIGHT_COLOUR, payload: string} |
              {type: typeof SET_DEPTH_COLOUR, payload: string} |
              {type: typeof SET_COLOUR_OFFSET, payload: number} |
              {type: typeof SET_COLOUR_MULTIPLIER, payload: number} | 
              {type: typeof SET_SMALL_WAVES_SPEED, payload: number} |
              {type: typeof SET_SMALL_WAVES_ITERATIONS, payload: number} | 
              {type: typeof SET_SMALL_WAVES_ELEVATION, payload: number} |
              {type: typeof SET_SMALL_WAVES_FREQUENCY, payload: number} |
              {type: typeof SET_ROTATION, payload: number}
              ;

const initialState: ControlPanelState = {
  bigWavesElevation: 0.35,
  bigWavesFrequency: [1.585, 2.351],
  bigWavesSpeed: 0.834,
  heightColour: '#e5c2dc',
  depthColour: '#0c038c',
  colourOffset: 0.30,
  colourMultiplier: 2.5,
  smallWavesElevation: 0.09,
  smallWavesFrequency: 4.69,
  smallWavesIterations: 4.0,
  smallWavesSpeed: 0.88,
  rotation: 1.9
};


const reducer = (state: ControlPanelState, action: Action):ControlPanelState => {
  switch (action.type) {
    case SET_BIG_WAVES_ELEVATION:
      return {...state, bigWavesElevation: action.payload}
    case SET_BIG_WAVES_FREQ_X:
      return {...state, bigWavesFrequency : [action.payload, state.bigWavesFrequency[1]]}
    case SET_BIG_WAVES_FREQ_Y:
      return {...state, bigWavesFrequency : [state.bigWavesFrequency[0], action.payload]}
    case SET_BIG_WAVES_SPEED:
      return {...state, bigWavesSpeed: action.payload}
    case SET_HEIGHT_COLOUR:
      return {...state, heightColour: action.payload}
    case SET_DEPTH_COLOUR:
      return {...state, depthColour: action.payload}
    case SET_COLOUR_OFFSET:
      return {...state, colourOffset: action.payload}
    case SET_COLOUR_MULTIPLIER:
      return {...state, colourMultiplier: action.payload}
    case SET_SMALL_WAVES_FREQUENCY:
      return {...state, smallWavesFrequency: action.payload}
    case SET_SMALL_WAVES_SPEED:
      return {...state, smallWavesSpeed: action.payload}
    case SET_SMALL_WAVES_ITERATIONS:
      return {...state, smallWavesIterations: action.payload}
    case SET_SMALL_WAVES_ELEVATION:
      return {...state, smallWavesElevation: action.payload}
    case SET_ROTATION:
      return {...state, rotation: action.payload}
    default:
      return state;
  }
};

interface ControlPanelProps {
  sceneObject: SceneInterface ;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ sceneObject }) => {
  const [controlPanelState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    sceneObject && sceneObject.updateUniforms(controlPanelState);
  }, [controlPanelState, sceneObject]);

  const handleElevationChange = (numArray: number[]) =>{
    dispatch({type: SET_BIG_WAVES_ELEVATION, payload: numArray[0]});
  };

  const handleFreqChangeX = (numArray: number[]) => {
    dispatch({type: SET_BIG_WAVES_FREQ_X, payload: numArray[0]});
  };

  const handleFreqChangeY = (numArray: number[]) => {
    dispatch({type: SET_BIG_WAVES_FREQ_Y, payload: numArray[0]});
  };

  const handleSpeedChange = (numArray: number[]) => {
    dispatch({type: SET_BIG_WAVES_SPEED, payload: numArray[0]});
  };

  const handleHeightColourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColour = e.target.value;
    console.log(hexColour);
    dispatch({ type: SET_HEIGHT_COLOUR, payload: hexColour });
  };

  const handleDepthColourChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const hexColour = e.target.value;
    console.log(hexColour);
    dispatch({type: SET_DEPTH_COLOUR, payload: hexColour});
  };

  const handleOffsetChange = (numArray: number[])=>{
    dispatch({ type: SET_COLOUR_OFFSET, payload: numArray[0] });
  };

  const handleColourMultiplierChange = (numArray: number[])=>{
    dispatch({ type: SET_COLOUR_MULTIPLIER, payload: numArray[0] });
  };

  const handleSmallWavesElevChange= (numArray: number[])=>{
    dispatch({ type: SET_SMALL_WAVES_ELEVATION, payload: numArray[0] });
  };

  const handleSmallWavesFreqChange= (numArray: number[])=>{
    dispatch({ type: SET_SMALL_WAVES_FREQUENCY, payload: numArray[0] });
  };

  const handleSmallWavesIterationsChange= (numArray: number[])=>{
    dispatch({ type: SET_SMALL_WAVES_ITERATIONS, payload: numArray[0] });
  };

  const handleSmallWavesSpeedChange= (numArray: number[])=>{
    dispatch({ type: SET_SMALL_WAVES_SPEED, payload: numArray[0] });
  };

  const handleRotation= (numArray: number[])=>{
    dispatch({ type: SET_ROTATION, payload: numArray[0] });
  };

  return (
    <section className="mt-2 flex flex-col items-center z-10">
      <div className="border border-input p-4 rounded-md w-96">
        <div className="flex items-center text-primary">
          <IconArrowsMoveVertical className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleElevationChange} defaultValue={[initialState.bigWavesElevation]} max={1.0} step={0.001} className="w-[30%] px-2" />
          Amplitude: {controlPanelState.bigWavesElevation}
        </div>

        <div className="flex items-center text-primary">
          <IconWaveSine className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleFreqChangeX} defaultValue={[initialState.bigWavesFrequency[0]]} max={4.0} step={0.001} className="w-[30%] px-2" />
          xSin(θ) radians: {controlPanelState.bigWavesFrequency[0]}
        </div>

        <div className="flex items-center text-primary">
          <IconWaveSine className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleFreqChangeY} defaultValue={[initialState.bigWavesFrequency[1]]} max={4.0} step={0.001} className="w-[30%] px-2" />
          ySin(θ) radians: {controlPanelState.bigWavesFrequency[1]}
        </div>

        <div className="flex items-center text-primary">
          <IconBrandSpeedtest className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleSpeedChange} defaultValue={[initialState.bigWavesSpeed]} max={10.0} step={0.001} className="w-[30%] px-2" />
          Frequency: {controlPanelState.bigWavesSpeed}
        </div>

        <div className="flex items-center text-primary">
          <IconPalette className="h-8 w-8 text-primary" />
          <input className="ml-2 " style={{ marginRight: '2.2rem' }} type="color" value={controlPanelState.heightColour} onChange={handleHeightColourChange} />
          Amp height colour: {controlPanelState.heightColour}
        </div>

        <div className="flex items-center text-primary">
          <IconPalette className="h-8 w-8 text-primary" />
          <input type="color" value={controlPanelState.depthColour} onChange={handleDepthColourChange} className="ml-2" style={{ marginRight: '2.2rem' }} />
          Amp depth colour: {controlPanelState.depthColour}
        </div>

        <div className="flex items-center text-primary">
          <IconArrowsMoveVertical className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleOffsetChange} defaultValue={[initialState.colourOffset]} max={1.0} step={0.001} className="w-[30%] px-2" />
          Colour Offset: {controlPanelState.colourOffset}
        </div>

        <div className="flex items-center text-primary">
          <IconMultiplier2x className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleColourMultiplierChange} defaultValue={[initialState.colourOffset]} max={10.0} step={0.001} className="w-[30%] px-2" />
          Colour Multiplier: {controlPanelState.colourMultiplier}
        </div>

        <div className="flex items-center text-primary">
          <IconWaveSine className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleSmallWavesFreqChange} defaultValue={[initialState.smallWavesFrequency]} max={10.0} step={0.001} className="w-[30%] px-2" />
          Small waves Sin(θ): {controlPanelState.smallWavesFrequency}
        </div>

        <div className="flex items-center text-primary">
          <IconArrowsMoveVertical className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleSmallWavesElevChange} defaultValue={[initialState.smallWavesElevation]} max={0.3} step={0.01} className="w-[30%] px-2" />
          Small waves amplitude: {controlPanelState.smallWavesElevation}
        </div>

        <div className="flex items-center text-primary">
          <IconArrowIteration className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleSmallWavesIterationsChange} defaultValue={[initialState.smallWavesIterations]} max={10.0} step={1.0} className="w-[30%] px-2" />
          Small waves iterations: {controlPanelState.smallWavesIterations}
        </div>

        <div className="flex items-center text-primary">
          <IconBrandSpeedtest className="h-8 w-8 text-primary" />
          <Slider onValueChange={handleSmallWavesSpeedChange} defaultValue={[initialState.smallWavesSpeed]} max={10.0} step={0.01} className="w-[30%] px-2" />
          Small waves freq: {controlPanelState.smallWavesSpeed}
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;
