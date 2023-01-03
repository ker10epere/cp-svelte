<script lang="ts">
    import Row from "./copy/Row.svelte";
    import type {Textarea} from "../../types/textarea";
    import {v4 as uuidv4} from 'uuid';
    import {CopyToClipboard} from "../../utils/copyToClipboard";
    import type {ElementClassList} from "../../types/elementClassList";
    import {activeElementNotifUtil, elementNotifUtil} from "../../utils/activeElementNotifUtil";
    import Cookies from "js-cookie";
    import autoAnimate from '@formkit/auto-animate';

    let textareas: Textarea[] = JSON.parse(Cookies.get('textareas') || '[]')

    function scrollInBottonOnBottom(isRemove: boolean = false) {
        const submitButton = document.getElementById('cp-submit-button');
        const {top} = submitButton.getBoundingClientRect()
        window.scrollTo(0, top - document.body.getBoundingClientRect().top - (window.innerHeight - submitButton.getBoundingClientRect().height * (isRemove ? 0.5 : 3)))
    }

    function remove(textarea: Textarea) {
        textareas = textareas.filter(({id}) => id !== textarea.id)
        scrollInBottonOnBottom(true);

    }

    function add() {
        textareas = [...textareas, {title: "", text: "", id: uuidv4()}]
        activeElementNotifUtil()
        scrollInBottonOnBottom();
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
    <ul id="cp-row-container" use:autoAnimate>

        {#each textareas as textarea}
            <Row bind:textarea handleRemoveButton={remove} handleCopyButton={copy} {handleTitleClick}
                 {handleTitleKeydown}/>
        {/each}

    </ul>
    <div class="is-flex is-flex-direction-column">
        <button use:autoAnimate class="button" id="cp-submit-button" on:click={add}>Add</button>
    </div>
</div>
<svelte:window on:keydown={onKeyDown}/>
