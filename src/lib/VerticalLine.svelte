<script lang="ts">
    import type {SvelteHTMLElements} from 'svelte/elements';

    const {lineHeight, ...rest}: SvelteHTMLElements['div'] & { lineHeight: string } = $props();
</script>

<div {...rest} style:height={lineHeight}></div>

<style>
    * {
        /*#E6E8EC*/
        border-left: 2px solid grey;
        border-radius: 2px;
    }
</style>
