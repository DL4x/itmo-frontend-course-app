<script lang="ts">
    import {onMount} from 'svelte';
    import lottie from 'lottie-web';
    import type {AnimationItem} from 'lottie-web';

    export let path: string | undefined;
    export let loop = true;
    export let autoplay = true;
    export let renderer: 'svg' | 'canvas' | 'html' = 'svg';
    export let speed = 1;
    export let width: string = '100%';
    export let height: string = '100%';
    export let mirrored = false;

    let container: HTMLDivElement;
    let animation: AnimationItem | null = null;

    onMount(() => {
        if (!container) return;

        animation = lottie.loadAnimation({
            container,
            renderer,
            loop,
            autoplay,
            ...(path ? {path} : {})
        });

        animation.setSpeed(speed);

        return () => {
            animation?.destroy();
        };
    });
</script>

<div
        bind:this={container}
        style="width: {width}; height: {height}; transform: {mirrored ? 'scaleX(-1)' : 'none'};"
></div>
