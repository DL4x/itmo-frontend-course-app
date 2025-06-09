<script lang="ts">
    // import type { PageProps } from './$types';
    import '/src/app.css';
    import Grid from '$lib/sections/Grid.svelte';

    // const { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Resume</title>
</svelte:head>

<div class="Content text-black">
    <Grid/>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'); /* DM Sans */

    .Content {
        font-family: 'JetBrains Mono', monospace;
        /* width: 1140px; */
        width: 90%;
        display: flex;
        gap: 120px;
        flex-direction: column;
        margin: auto;
        margin-top: 30px;
    }

    @font-face {
        font-family: 'JetBrains Mono';
        font-weight: 500;
        font-style: normal;
        src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    }
</style>
