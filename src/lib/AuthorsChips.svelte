<script lang="ts">
	import type { Author } from '$lib/index';
	import AuthorSmallCard from '$lib/AuthorSmallCard.svelte';

	interface Props {
		authors: Iterable<Author>;
	}

	const { authors }: Props = $props();
</script>

<div class="flex flex-row flex-wrap gap-4">
	{#each authors as author (author.id)}
		<AuthorSmallCard {...author} />
	{/each}
</div>