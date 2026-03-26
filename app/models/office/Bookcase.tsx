import * as THREE from 'three'

export const Bookcase = ({mesh}) => 
        <mesh>
            <primitive object={mesh} material={new THREE.MeshStandardMaterial({ color: 0xFFFFFF})} />
        </mesh>
