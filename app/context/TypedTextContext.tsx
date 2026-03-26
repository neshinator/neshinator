import { createContext, useContext, useState } from "react"
import { TTypedText } from "../types/TypedText";
import { useTypedText } from "../hooks/useTypedText";

type TTypedTextContext = {
    messages: TTypedText[];
    startTyping: (messages: string[]) => void;
    appendTyping: (messages: string[]) => void;
}

const TypedTextContext = createContext<TTypedTextContext | null>(null)

export const TypedTextContextProvider = ({children}: { children: React.ReactNode}) => {
    const {messages, startTyping, appendTyping} = useTypedText()

    return <TypedTextContext.Provider value={{messages, startTyping, appendTyping}}>
        {children}
    </TypedTextContext.Provider>
}

export const useTypedTextContext = () => {
    const context = useContext(TypedTextContext);
    if (!context) throw new Error('useTypedTextContext must be used within a TypedTextContextProvider')
    return context;
}