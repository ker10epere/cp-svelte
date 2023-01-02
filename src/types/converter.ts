import type {Operation} from "./operation";

export interface Converter {
    title: string
    operation: Operation

    number2: number

    resultFormat: string
    isSelectedTab: boolean
}