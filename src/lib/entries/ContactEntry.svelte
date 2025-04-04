<script lang="ts">
	import type { Contact } from '$lib';

	interface Props {
		name: string;
		contact?: Contact;
	}

	const { name, contact }: Props = $props();
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
</style>

<div class="content">
	<h2>{name}</h2>
	<h3>
		{#if contact === undefined}
			Unknown
		{:else if contact.href !== ''}
			<a href={contact.href}>{contact.value}</a>
		{:else}
			{contact.value}
		{/if}
	</h3>
</div>