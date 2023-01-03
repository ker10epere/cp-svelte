<script lang="ts">
    import autosize from 'svelte-autosize';
    import type {Textarea} from "../../../types/textarea";

    export let handleCopyButton: Function
    export let handleRemoveButton: (textarea: Textarea) => void
    export let textarea: Textarea

    export let handleTitleClick

    export let handleTitleKeydown

</script>
<li class="is-flex container my-2">
    <input type="text" style:width="200px" class="mr-1" placeholder="title" bind:value={textarea.title} name="cp-title"
           on:click={handleTitleClick} on:keydown={handleTitleKeydown}>
    <textarea style:width="100%" use:autosize bind:value={textarea.text} name="cp-textarea"
              placeholder="focus on this textbox and (ctrl + enter) to copy this, or (click or enter in left title to copy this textbox)"></textarea>
    <button class="button mx-1" on:click={async ()=> await handleCopyButton(textarea.text)}>copy</button>
    <button class="button" on:click={()=>handleRemoveButton(textarea)}>remove</button>
</li>