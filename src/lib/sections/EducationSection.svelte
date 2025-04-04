<script lang="ts">
	import type { Education } from '$lib';
	import EducationEntry from '$lib/entries/EducationEntry.svelte';
	import TwoColumnLayout from '$lib/TwoColumnLayout.svelte';

	interface Props {
		educations: Education[];
	}

	const { educations }: Props = $props();
</script>

<style>
</style>

<section id="education_section">
	<h1>Education</h1>
	<TwoColumnLayout first={educations} second={educations} FirstComponent={EducationEntry}
									 SecondComponent={EducationEntry} />
</section>