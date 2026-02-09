import { Dispatch, SetStateAction } from "react"

export const updateInputState =  (e: Event, updateState: Dispatch<SetStateAction<string>> ): void => { 
    if(e?.target instanceof HTMLInputElement) updateState(e?.target?.value)
    }

export function hasProps<T extends object, K extends keyof T>(
  obj: T,
  properties: K[]
): obj is T & Required<Pick<T, K>> {
  return properties.every(prop => obj[prop] !== undefined && obj[prop] !== null);
}

export const isObject = ( val: unknown): boolean  => (  val !== undefined && val !== null && typeof val === "object")

export const isX = ( val: Array<string>, X: any): boolean  => { return val.every( (prop) => X[prop] !== undefined && X[prop] !== null) }