import { useHelper } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

const WallLight = ({mesh, position, name, colour}) => {
    const light = useRef();
    const light2 = useRef();
    const areaLight = useRef();
    const areaLight2 = useRef();
    const backLight = useRef();
    //useHelper(light, THREE.SpotLightHelper, colour);
    useHelper(light2, THREE.SpotLightHelper, colour);
    // useHelper(areaLight, RectAreaLightHelper, colour)
    // useHelper(areaLight2, RectAreaLightHelper, colour)
    const newPos = [position[0] + 20, position[1] + 35 , position[2] + 45]
    const newPos2 = [newPos[0], newPos[1] - 40, newPos[1]];
    const newPos3 = [newPos[0], newPos[1] + 20, newPos[2]-10]

    const newPos4 = [newPos[0], newPos[1] + 5, newPos[2] - 15]

    const lightPos = [position[0] + 22.7, position[1] + 35, position[2] + 35]

    // useEffect(() => {
    //     if (areaLight.current){
    //         areaLight.current.lookAt(...[0,0,0])
    //     }
    // }, [])

    // RectAreaLightUniformsLib.init();
    return <>
        <mesh position={position} castShadow>
            <primitive name={name} object={mesh.clone()} material={new THREE.MeshPhysicalMaterial({ color: 0x736126})} />
        </mesh>
        <mesh position={lightPos}>
            <boxGeometry args={[1.2,2,1.2]} />
            <meshStandardMaterial color={0xffffff} emissive={2000} emissiveIntensity={2000} />
        </mesh>
        <rectAreaLight ref={areaLight} position={newPos4} width={5} height={10} intensity={10} color={0xfcd8c7} rotation={[130, 0, 0]}/>
        <rectAreaLight ref={areaLight2} position={newPos4} width={5} height={10} intensity={100} color={0x696fdb} rotation={[50, 0, 0]}/>
        {/* <spotLight ref={light2} decay={1.5} intensity={500} penumbra={0.8} position={newPos4} target={backLight.current} angle={Math.PI/5} /> */}
        {/* <spotLight ref={light2} decay={1.5} intensity={1000} penumbra={0.5} position={newPos3} target={backLight.current} angle={Math.PI/5} /> */}
        {/* <spotLight ref={light} decay={1} intensity={500} penumbra={0.2} distance={0} angle={Math.PI/6} position={newPos} castShadow shadow-bias={-0.0004} /> */}
    </>
}

export const Lights = ({mesh}) => {
    const ref = useRef();
    const spot1 = useRef();
    // useHelper(spot1, THREE.SpotLightHelper, 'pink');
    const lightPosition = [-40, 30, 0];
    //const light2Position = [10, 30, 5];

    const spotPosition1 = [30,30,30]

    return <>
        <ambientLight intensity={0.5} />
        <directionalLight ref={ref} intensity={1.7} castShadow shadow-bias={-0.0004} position={lightPosition} shadow-mapSize={2048} />
        <WallLight name='Light1' mesh={mesh} position={[-43,0,0]} colour='cyan' />
        <WallLight name='Light2' mesh={mesh} position={[0,0,0]} colour='pink' />
        {/* <spotLight ref={spot1} decay={1} intensity={100} penumbra={0.2} distance={0} angle={Math.PI/6} position={spotPosition1} castShadow /> */}
    </>
}