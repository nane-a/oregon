import { useEffect } from "react";

export const useEnter = (callback: Function, condition: boolean = true) => {
    const onKeyDown = (event: any) => {
        
        if (event.key === "Enter" && condition) {
            event.preventDefault()
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])
}