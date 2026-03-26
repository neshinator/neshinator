'use client'
import { MouseProvider } from "./MouseContext"
import { TypedTextContextProvider } from "./TypedTextContext"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MouseProvider>
            <TypedTextContextProvider>
                {children}
            </TypedTextContextProvider>
        </MouseProvider>
    )
}