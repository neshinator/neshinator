import * as THREE from 'three'

export const Desk = ({feet, table}) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x222222, reflectivity: 1, shininess: 100});
    return <>
        <mesh>
            <primitive object={feet} material={material} />
        </mesh>
        <mesh>
            <primitive object={table} material={material} />
        </mesh>
    </>
}