import type {EventElement} from "../types/eventElement";
import type {Element} from "svelte/types/compiler/interfaces";

export function setValueToZero(e: EventElement<HTMLInputElement>) {
    e.currentTarget.value = '0'
}