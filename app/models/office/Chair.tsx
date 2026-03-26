import * as THREE from 'three'

export const Chair = ({feet, handles, chair}) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x222222, reflectivity: 1});
    return <>
        <mesh>
            <primitive object={handles} material={material} />
        </mesh>
        <mesh>
            <primitive object={chair} material={material} />
        </mesh>
        <mesh>
            <primitive object={feet} material={material} />
        </mesh>
    </>
}