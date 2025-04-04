<script lang="ts" generics="T extends IDObject, K extends IDObject">
	import type { IDObject } from '$lib/index';
	import type { Component } from 'svelte';

	interface Props {
		first: T[];
		second: K[];
		FirstComponent: Component<T>;
		SecondComponent: Component<K>;
	}

	const { first, second, FirstComponent, SecondComponent }: Props = $props();
</script>

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
</style>

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