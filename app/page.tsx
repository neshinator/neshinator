
'use client'

import { Suspense, useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from 'three'

import { Environment, OrbitControls } from '@react-three/drei'
import { Lights } from './models/lights/Lights';
import { Doors } from './models/office/Doors';
import { Bookcase } from './models/office/Bookcase';
import { Desk } from './models/office/Desk';
import { Chair } from './models/office/Chair';
import { Stormtrooper } from './models/office/Stormtrooper';
import { Room } from './models/office/Room';

import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { Computer } from './models/office/Computer';
import { TypedText } from './components/typedText';
import { useMouseContext } from './context/MouseContext';

// Initialise once at module level
RectAreaLightUniformsLib.init()

function Group({children}) {
  const groupRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (timeRef && groupRef){
      timeRef.current += delta * 0.5

      groupRef.current.rotation.y = Math.sin(timeRef.current) * 0.1
    }
  })

  return <group ref={groupRef} position={[0, -15, 0]} rotation={[0, -0.1, 0]}>
    {children}
  </group>
}

function Model({onLoad}: {onLoad: () => void}) {

  useEffect(() => {
    onLoad?.()
  }, [])

  // useLoader should suspend this component so don't need to check for a result
  const obj = useLoader(GLTFLoader, 'office.glb');
  const colorMap = useLoader(THREE.TextureLoader, 'office-cm.png')
  colorMap.flipY = false;
  const normalMap = useLoader(THREE.TextureLoader, 'office-nm.png')
  normalMap.flipY = false;

  const helmetColorMap = useLoader(THREE.TextureLoader, 'helmet-cm.png')
  helmetColorMap.flipY = false;
  const bodyColorMap = useLoader(THREE.TextureLoader, 'body-cm.png')
  bodyColorMap.flipY = false;
  const lightPosition = [10, 40, 10];
  const light2Position = [10, 30, 5];

  const office = obj.meshes.Office
  office.receiveShadow = true;

  const light = obj.meshes.light
  light.receiveShadow = true;

  const door1 = obj.meshes.door1;
  const door2 = obj.meshes.door2;
  const bookcase = obj.meshes.bookcase;
  const deskfeet = obj.meshes['desk-feet'];
  const desktop = obj.meshes['desk-top'];
  const chair = obj.meshes.seat;
  const chairFeet = obj.meshes['seat-feet']
  const chairHandles = obj.meshes['seat-handles']
  const head = obj.meshes.helmet;
  const body = obj.meshes.body;
  const screen = obj.meshes.screen1;

 {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Noise opacity={0.3} /> */}
      {/* <Vignette eskil={false} offset={0.5} darkness={0.5} /> */}

  return <Canvas shadows camera={{ position: [80, 30, -80], fov: 60 }}>
    <EffectComposer>
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} height={300} />
    </EffectComposer>
    <Group>
      <Lights mesh={light} />
      {/* <mesh position={[0, 8, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 10, 10]}  />
        <meshLambertMaterial color='orange' />
      </mesh> */}
      <Room mesh={office} colourMap={colorMap} normalMap={normalMap} />
      <Computer mesh={screen} />
      <Doors door1={door1} door2={door2} />
      <Bookcase mesh={bookcase} />
      <Desk feet={deskfeet} table={desktop} />
      <Chair handles={chairHandles} feet={chairFeet} chair={chair} />
      <Stormtrooper head={head} body={body} helmetColorMap={helmetColorMap} bodyColorMap={bodyColorMap} />
    </Group>
    {/* <OrbitControls /> */}
  </Canvas>
}

export default function Home() {
  const {isHovered} = useMouseContext()
  const [startTyping, setStartTyping ] = useState<boolean>(false)
  return (
      <main style={{ cursor: isHovered ? 'pointer' : 'default'}} className="flex min-h-screen w-full flex-col items-center bg-black">

        <div className="w-full h-screen fixed">
          <Suspense fallback={<div className='text-white'>loading...</div>}>
            <Model onLoad={() => {
              setStartTyping(true)
            }} />
          </Suspense>
        </div>
        <div className='text-white w-[1000px]'>
          <div><button>Experience</button><button>Contact</button></div>
          <TypedText initialTyping={startTyping} />
        </div>
      </main>
  );
}

