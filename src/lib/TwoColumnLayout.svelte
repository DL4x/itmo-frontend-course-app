<script generics="T extends IDObject, K extends IDObject" lang="ts">
	import type { Component } from 'svelte';
	import type { IDObject } from '$lib/index';

	interface Props {
		first: T[];
		second: K[];
		FirstComponent: Component<T>;
		SecondComponent: Component<K>;
	}

	const { first, second, FirstComponent, SecondComponent }: Props = $props();
</script>

<div class="content">
	<div class="content-column">
		{#each first as elem (elem.id)}
			<FirstComponent {...elem} />
		{/each}
	</div>
	<div class="content-column">
		{#each second as elem (elem.id)}
			<SecondComponent {...elem} />
		{/each}
	</div>
</div>

<style>
    .content {
        display: flex;
        gap: 32px;
    }

    .content-column {
        display: flex;
        flex-direction: column;
        gap: 32px;
        flex: 1;
    }

    @media (max-width: 600px) {
        .content {
            flex-direction: column;
        }
    }
</style>
