import * as THREE from 'three'

export const Room = ({mesh, colourMap, normalMap}) => {
    return <>
        <mesh receiveShadow>
            <primitive name='Office' object={mesh} material={new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, map: colourMap, normalMap: normalMap})} />
        </mesh>
    </>
}