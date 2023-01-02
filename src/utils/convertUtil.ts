import type {Converter} from "../types/converter";
import {Operation} from "../types/operation";

export function evaluate(number1: number, {number2, operation}: Converter): number {
    switch (operation) {
        case Operation.add:
            return number1 + number2
        case Operation.subtract:
            return number1 - number2
        case Operation.multiply:
            return number1 * number2
        case Operation.divide:
            return number1 / number2
    }
}

export function formatResult({
                                 number1,
                                 result,
                                 number1DecimalPoint,
                                 resultDecimalPoint
                             }: { number1: number, number1DecimalPoint: number, result: number, resultDecimalPoint: number },
                             {resultFormat}: Converter): string {
    return resultFormat.replace("##NUMBER1##", number1.toFixed(number1DecimalPoint).toString())
        .replace("##RESULT##", result.toFixed(resultDecimalPoint).toString())
}