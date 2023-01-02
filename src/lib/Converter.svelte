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
            resultFormat: "Random Blood Sugar: ##NUMBER1## mmol/L (##RESULT## mg/dL)\nNon-fasting specimen",
            isSelectedTab: true
        }, {
            title: "Creatinine",
            operation: Operation.divide,
            number2: 88.42,
            resultFormat: "##RESULT## mg/dL",
            isSelectedTab: false
        }
    ]

    let currentConverter: Converter = converters[0]

    let number1 = 0

    function onConverterClick(item: Converter) {
        currentConverter = {
            ...item, isSelectedTab: true
        }
        converters = converters.map(converter => {
            if (converter === item) return currentConverter
            converter.isSelectedTab = false
            return converter
        })
    }

    function handleNumber1Input(e: EventElement<HTMLInputElement>) {
        const {value} = e.currentTarget
        if (value === '') {
            setValueToZero(e)
            number1 = 0
        } else {
            number1 = parseFloat(value);
        }

    }

    function handleNumber1Click(e: EventElement<HTMLInputElement>) {
        setValueToZero(e)
        number1 = 0
    }

    function handleFormSubmit(e: SubmitEvent & EventElement<any>) {
        e.preventDefault()
        copyResultToClipboard()
    }

    function copyResultToClipboard(){
        navigator.clipboard.writeText(result)
    }

    $: result = formatResult({
        number1,
        number1DecimalPoint: 2,
        resultDecimalPoint: 2,
        result: evaluate(number1, currentConverter)
    }, currentConverter)
</script>


<div class="is-flex is-flex-direction-column container is-max-desktop">
    <form on:submit={handleFormSubmit}>
        <div class="my-3 is-flex">
            <input type="text" inputmode="numeric" class="input is-medium is-hovered" name="number1"
                   on:input={handleNumber1Input} value={number1}
                   on:click={handleNumber1Click}>
            <button class="button is-medium is-success mx-3">Copy</button>
        </div>

        <Tabs>
            {#each converters as converter}
                <li class={converter.isSelectedTab ? "is-active" : null}>
                    <a on:click={()=> onConverterClick(converter)}>
                        <span>{converter.title}</span>
                    </a>
                </li>
            {/each}
        </Tabs>
        <button type="submit" class="is-hidden"></button>
    </form>
    <pre>{result}</pre>
</div>
