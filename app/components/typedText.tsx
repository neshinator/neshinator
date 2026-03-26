import { useEffect } from "react"
import { useTypedTextContext } from "../context/TypedTextContext"

const initMessages = [
    '> Hi! I\'m Nesh...',
    '> I\'m a Frontend Developer with 20+ years of experience.',
    '> I know what you are thinking...did I use AI to create any of this?'
]

export const TypedText = ({initialTyping}: {initialTyping: boolean}) => {
    const { messages, startTyping } = useTypedTextContext()

    useEffect(() => {
        if (initialTyping){
            startTyping(initMessages)
        }
    }, [initialTyping])

    const cursor = <div className="inline-block w-[20px] h-10 bg-white animate-blink align-middle ml-[2px]"></div>
    
    const finalMessages = messages.filter(x => x.message !== '')
    return <div className='w-full text-4xl mt-10 text-left font-mono'>
        <div>
            {/* <div className="mb-4">&gt; Hi! I'm Nesh...{messages.length > 0 && <br />}{!messages.length && cursor}</div> */}
            {finalMessages.map((text, i) => {
                return <div key={i} className="block mb-4">{text.message}{text.complete && <br/>}{i === finalMessages.length - 1 && cursor}</div>
            })}
        </div>
    </div>
}