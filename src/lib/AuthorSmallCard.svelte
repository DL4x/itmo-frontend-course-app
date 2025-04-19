<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	interface Props {
		id: string;
		name: string;
	}

	const { id, name }: Props = $props();

	function getInitials(str: string): string {
		if (str.length == 2) return str.toUpperCase();

		const words = str.split(/\s+/);
		switch (words.length) {
			case 0:
				return '';
			case 1:
				return `${words[0][0].toUpperCase()}`;
			default:
				return `${words[0][0].toUpperCase()} ${words[1][0].toUpperCase()}`;
		}
	}
</script>

<style>
	.chip {
			padding: 2px 4px !important;
	}
</style>

<a href="/resumes/{id}" class="chip bg-gray flex flex-row gap-1 items-center">
	<Avatar size="sm" class="bg-primary-200 group-hover:bg-primary-300 transition-colors">{getInitials(name)}</Avatar>
	<div class="font-medium dark:text-white flex flex-col">
		<h6 class="text-sm">{name}</h6>
<!--		<a href={email.href} class="text-sm text-gray-400 dark:text-gray-400">{email.value}</a>-->
	</div>
</a>