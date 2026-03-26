import * as THREE from 'three'

export const Doors = ({door1, door2}) => {
    return <>
        <mesh>
            <primitive object={door1} material={new THREE.MeshLambertMaterial({ color: 0xFFFFFF})} />
        </mesh>
        <mesh>
            <primitive object={door2} material={new THREE.MeshLambertMaterial({ color: 0xFFFFFF})} />
        </mesh>
    </>
}