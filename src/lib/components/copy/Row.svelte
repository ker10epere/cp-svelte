<script lang="ts">
    import autosize from 'svelte-autosize';
    import type {Textarea} from "../../../types/textarea";

    export let handleCopyButton: Function
    export let handleRemoveButton: (textarea: Textarea) => void
    export let textarea: Textarea
</script>
<div class="is-flex container my-2">
    <textarea style:width="100%" use:autosize bind:value={textarea.text} name="cp-textarea"></textarea>
    <button class="button mx-1" on:click={async ()=> await handleCopyButton(textarea.text)}>copy</button>
    <button class="button" on:click={()=>handleRemoveButton(textarea)}>remove</button>
</div>