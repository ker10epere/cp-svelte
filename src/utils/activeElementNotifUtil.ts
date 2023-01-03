import type {ElementClassList} from "../types/elementClassList";

export function activeElementNotifUtil() {
    const activeElement = document.activeElement as ElementClassList;
    activeElement.classList.add('has-background-success')
    setTimeout(() => {
        activeElement.classList.remove('has-background-success')
    }, 700)
}

export function elementNotifUtil(e: HTMLElement | Element) {
    const activeElement = e as HTMLElement
    activeElement.classList.add('has-background-success')
    setTimeout(() => {
        activeElement.classList.remove('has-background-success')
    }, 700)
}