import type {EventElement} from "../types/eventElement";

export function setValueToZero(e: EventElement<HTMLInputElement>) {
    e.currentTarget.value = '0'
}