<script lang="ts">
    import type {Converter} from "../types/converter";
    import {Operation} from "../types/operation";
    import Tabs from "./components/Tabs.svelte";
    import type {EventElement} from "../types/eventElement";
    import {setValueToZero} from "../utils/formUtil";
    import {evaluate, formatResult} from "../utils/convertUtil.js";

    let converters: Converter[] = [
        {
            title: "Random Blood Sugar",
            operation: Operation.multiply,
            number2: 18.02,
            resultFormat: "Random Blood Sugar: ##NUMBER1## mmol/L (##RESULT## ##TO_UNIT##)\nNon-fasting specimen",
            isSelectedTab: true,
            fromUnit: 'mmol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Creatinine",
            operation: Operation.divide,
            number2: 88.42,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'umol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Calcium",
            operation: Operation.divide,
            number2: 0.2495,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'mmol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Magnesium",
            operation: Operation.divide,
            number2: 0.41152,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'mmol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Bilirubin",
            operation: Operation.divide,
            number2: 17.1,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'umol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Phosporus",
            operation: Operation.divide,
            number2: 0.3229,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'mmol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Urea",
            operation: Operation.divide,
            number2: 0.3571,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'mmol/L',
            toUnit: 'mg/dL'
        }, {
            title: "Glucose",
            operation: Operation.divide,
            number2: 0.0555,
            resultFormat: "##RESULT## ##TO_UNIT##",
            isSelectedTab: false,
            fromUnit: 'mmol/L',
            toUnit: 'mg/dL'
        }
    ]

    let currentConverterState: Converter = converters[0]

    let number1State = 0

    function onConverterClick(item: Converter) {
        currentConverterState = {
            ...item, isSelectedTab: true
        }
        converters = converters.map(converter => {
            if (converter === item) return currentConverterState
            converter.isSelectedTab = false
            return converter
        })
    }

    function handleNumber1Input(e: EventElement<HTMLInputElement>) {
        const {value} = e.currentTarget
        if (value === '') {
            setValueToZero(e)
            number1State = 0
        } else {
            number1State = parseFloat(value);
        }

    }

    function handleNumber1Click(e: EventElement<HTMLInputElement>) {
        setValueToZero(e)
        number1State = 0
    }

    function handleFormSubmit(e: SubmitEvent & EventElement<any>) {
        e.preventDefault()
        copyResultToClipboard()
    }

    function copyResultToClipboard() {
        navigator.clipboard.writeText(result)
    }

    $: evaluatedResult = evaluate(number1State, currentConverterState)

    $: result = formatResult({
        number1: number1State,
        number1DecimalPoint: 2,
        resultDecimalPoint: 2,
        result: evaluatedResult
    }, currentConverterState)
</script>


<div class="is-flex is-flex-direction-column container is-max-desktop">
    <form on:submit={handleFormSubmit}>
        <div class="my-3 is-flex">
            <input type="text" inputmode="numeric" class="input is-medium is-hovered" name="number1"
                   on:input={handleNumber1Input} value={number1State}
                   on:click={handleNumber1Click}>
            <span class="button is-medium mx-3 is-disabled disable-effect"
                  style="width: 200px">{currentConverterState.fromUnit}</span>
            <button class="button is-medium is-success">copy result</button>
        </div>
        <Tabs>
            {#each converters as converter}
                <li class={converter.isSelectedTab ? "is-active" : null}>
                    <a on:click={()=> onConverterClick(converter)} href={null}>
                        <span>{converter.title}</span>
                    </a>
                </li>
            {/each}
        </Tabs>
        <button type="submit" class="is-hidden"></button>
    </form>
    <div>
        Computation:
        <pre class="white-space-normal">{number1State} {currentConverterState.fromUnit} <b
                class="mx-3">{currentConverterState.operation}</b> {currentConverterState.number2}
            <br/>= {evaluatedResult} {currentConverterState.toUnit}</pre>
        Result:
        <pre class="white-space-pre-line">
            {result}
        </pre>
    </div>
</div>