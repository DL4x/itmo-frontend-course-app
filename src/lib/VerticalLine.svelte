<script lang="ts">
import type { SvelteHTMLElements } from 'svelte/elements';

// interface Props extends  {
// 	height: string;
// }

const {lineHeight, ...rest}: SvelteHTMLElements['div'] & {lineHeight: string;} = $props();
</script>

<style>
    * {
        /*#E6E8EC*/
        border-left: 2px solid grey;
				border-radius: 2px;
    }
</style>

<div style:height={lineHeight} {...rest}></div>
