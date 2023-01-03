import type {Operation} from "./operation";

export interface Converter {
    title: string
    operation: Operation

    number2: number
    fromUnit: string
    toUnit: string

    resultFormat: string
    isSelectedTab: boolean
}