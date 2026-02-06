import { Dispatch, SetStateAction } from "react"


export const updateInputState =  (e: Event, updateState: Dispatch<SetStateAction<string>> ): void => { 
    if(e?.target instanceof HTMLInputElement) updateState(e?.target?.value)
    }