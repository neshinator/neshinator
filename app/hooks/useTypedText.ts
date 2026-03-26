import { useRef, useState } from "react"
import { TTypedText } from "../types/TypedText"

let SPEED = 50

//custom hook
export const useTypedText = () => {
    // const [allmessages, setAllMessages] = useState<TTypedText[]>([])
    const [messages, setMessages] = useState<TTypedText[]>([])
    const stateRef = useRef<TTypedText[]>([])
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const runTyping  = (initMessages: string[], startingState: TTypedText[]) => {
        // Clear any in-progress typing
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        const newEntries = initMessages.map(() => ({ message: '', complete: false }))
        const combined = [...startingState, ...newEntries]
        stateRef.current = combined
        setMessages([...combined])

        let msgIndex = startingState.length
        // console.log('------', stateRef.current, messages, msgIndex)
        let letterIndex = 0

        const tick = () => {
            const currentMsg = initMessages[msgIndex - startingState.length]
            letterIndex++

            const updated = [...stateRef.current]
            updated[msgIndex] = {
                message: currentMsg.substring(0, letterIndex),
                complete: false,
            }

            if (letterIndex >= currentMsg.length) {
                updated[msgIndex].complete = true
                msgIndex++
                letterIndex = 0
                SPEED = 1000
                // const newAllMessages = allmessages
                // const msg = updated[msgIndex]
                // newAllMessages.push(updated(msgIndex))
                // setAllMessages(newAllMessages)
            } else {
                SPEED = 50
            }
            // console.log('updated', updated)

            stateRef.current = updated
            setMessages(updated)

            if (msgIndex < initMessages.length) {
                timeoutRef.current = setTimeout(tick, SPEED)
            }
        }

        timeoutRef.current = setTimeout(tick, SPEED)
    }

    // Clears everything and starts fresh
    const startTyping = (initMessages: string[]) => {
        runTyping(initMessages, [])
    }

    // Appends to existing messages
    const appendTyping = (initMessages: string[]) => {
        const existing = stateRef.current.map(m => ({ ...m, complete: true }))
        runTyping(initMessages, existing)
    }

    return { messages, startTyping, appendTyping }
}