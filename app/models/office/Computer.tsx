import * as THREE from 'three'

export const Computer = ({mesh}) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x222222, reflectivity: 1, shininess: 100});
    const newPos = [-37.5, 18, 0]
    const screenPos = [newPos[0]+0.5, newPos[1]+5, newPos[2]]
     const screenPos2 = [newPos[0]+0.5, newPos[1]+5, newPos[2]+15]
     const screenMaterial = <meshStandardMaterial color={0x85ccff} emissive={10} emissiveIntensity={100} />
    return <>
        <mesh>
            <primitive object={mesh} material={material} />
        </mesh>
        <mesh>
            <primitive object={mesh.clone()} position={newPos} material={material} />
        </mesh>
        <mesh position={screenPos} scale={[14,6.5,14]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry />
            {screenMaterial}
        </mesh>
        <mesh position={screenPos2} scale={[14,6.5,14]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry />
            {screenMaterial}
        </mesh>
    </>
}