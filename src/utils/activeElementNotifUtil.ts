import type {ElementClassList} from "../types/elementClassList";

export function activeElementNotifUtil(){
    const activeElement = document.activeElement as ElementClassList;
    activeElement.classList.add('has-background-success')
    setTimeout(()=>{
        activeElement.classList.remove('has-background-success')
    }, 700)
}