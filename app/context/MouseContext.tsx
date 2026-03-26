import { createContext, useContext, useState } from "react"

type TMouseContext = {
    isHovered: boolean;
    setIsHovered: (hovered:  boolean) => void;
}

const MouseContext = createContext<TMouseContext | null>(null)

export const MouseProvider = ({children}: { children: React.ReactNode}) => {
    const [isHovered, setIsHovered] = useState(false)

    return <MouseContext.Provider value={{isHovered, setIsHovered}}>
        {children}
    </MouseContext.Provider>
}

export const useMouseContext = () => {
    const context = useContext(MouseContext);
    if (!context) throw new Error('useMouseContext must be used within a MouseProvider')
    return context;
}