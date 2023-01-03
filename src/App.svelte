<script lang="ts">
    import Converter from './lib/Converter.svelte'
    import autosize from 'svelte-autosize';
    import Row from "./lib/components/copy/Row.svelte";
    import Copy from "./lib/components/Copy.svelte";
</script>

<main class="container ">
    <div class="is-flex is-flex-direction-column container is-max-desktop">
        <Converter/>
        <br>
        <Copy/>
    </div>
</main>

