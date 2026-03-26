import { useMouseContext } from '@/app/context/MouseContext'
import { useTypedTextContext } from '@/app/context/TypedTextContext'
import { useCallback, useState } from 'react'
import * as THREE from 'three'

const st_messages_1 = [
    '> Yes, I have a stormtrooper in my office. You will see this when you interview me.'
]

const st_messages_2 = [
    '> Yes, I am a nerd.',
]

export const Stormtrooper = ({head, body, helmetColorMap, bodyColorMap}) => {
    const [clicked, setClicked] = useState(0)
    const {setIsHovered} = useMouseContext()
    const {messages, appendTyping} = useTypedTextContext();
    const helmetMaterial = new THREE.MeshStandardMaterial({ map: helmetColorMap})
    const bodyMaterial = new THREE.MeshStandardMaterial({ map: bodyColorMap})

    const typeSomething = useCallback(() => {
        switch(clicked) {
            case 0:
                appendTyping(st_messages_1);
                break;
            case 1:
                appendTyping(st_messages_2);
                break;
            default:
                //do nothing
        }
        setClicked(clicked + 1)
    }, [clicked])

    return <>
        <mesh >
            <primitive object={head} material={helmetMaterial} />
        </mesh>
        <mesh onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)} onClick={typeSomething}>
            <primitive object={body} material={bodyMaterial} />
        </mesh>
    </>
}