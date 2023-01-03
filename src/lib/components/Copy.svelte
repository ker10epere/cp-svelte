<script lang="ts">
    import Row from "./copy/Row.svelte";
    import type {Textarea} from "../../types/textarea";
    import {v4 as uuidv4} from 'uuid';
    import {CopyToClipboard} from "../../utils/copyToClipboard";
    import type {ElementClassList} from "../../types/elementClassList";
    import {activeElementNotifUtil, elementNotifUtil} from "../../utils/activeElementNotifUtil";
    import Cookies from "js-cookie";

    let textareas: Textarea[] = JSON.parse(Cookies.get('textareas') || '[]')

    function remove(textarea: Textarea) {
        textareas = textareas.filter(({id}) => id !== textarea.id)
    }

    function add() {
        textareas = [...textareas, {title: "", text: "", id: uuidv4()}]
        activeElementNotifUtil()

        const submitButton = document.getElementById('cp-submit-button');
        // console.dir(submitButton)
        const {top, height} = submitButton.getBoundingClientRect()
        console.log({height, top})
        window.scrollTo(0, +top - document.body.getBoundingClientRect().top - (window.innerHeight - submitButton.getBoundingClientRect().height * 3))

    }

    function copy(text: string) {
        CopyToClipboard(text)
        activeElementNotifUtil()
    }

    function handleTitleClick({target: {nextElementSibling: textarea}}: HTMLInputElement) {
        CopyToClipboard(textarea.value)
        elementNotifUtil(textarea)
    }

    function handleTitleKeydown({code, target: {nextElementSibling: textarea}}: HTMLInputElement) {
        if (code === 'Enter') {
            CopyToClipboard(textarea.value)
            elementNotifUtil(textarea)
        }
    }

    function onKeyDown(e: KeyboardEvent) {
        const isCopyPressed = e.code === 'Enter' && e.ctrlKey
        let activeElement = document.activeElement as HTMLTextAreaElement & HTMLInputElement & ElementClassList;
        const isCpTextArea = activeElement.name === 'cp-textarea' && isCopyPressed
        if (isCpTextArea) {
            copy(activeElement.value)
            activeElementNotifUtil()
        }
    }

    function setTextareasCookie(textareas: Textarea[]) {
        Cookies.set('textareas', JSON.stringify(textareas), {
            path: '/'
        })
    }

    $: setTextareasCookie(textareas)
</script>
<div>
    <div id="cp-row-container">

        {#each textareas as textarea}
            <Row bind:textarea handleRemoveButton={remove} handleCopyButton={copy} {handleTitleClick}
                 {handleTitleKeydown}/>
        {/each}

    </div>
    <div class="is-flex is-flex-direction-column">
        <button class="button" id="cp-submit-button" on:click={add}>Add</button>
    </div>
</div>
<svelte:window on:keydown={onKeyDown}/>
