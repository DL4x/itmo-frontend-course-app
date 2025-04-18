<script lang="ts">
	import EducationEntry from '$lib/entries/EducationEntry.svelte';
	import TwoColumnLayout from '$lib/sections/TwoColumnLayout.svelte';
	import type { Education } from '$lib';

	interface Props {
		educations: Education[];
	}

	const { educations }: Props = $props();
</script>

<section id="education_section">
	<h1>Education</h1>
	<TwoColumnLayout
		FirstComponent={EducationEntry}
		SecondComponent={EducationEntry}
		first={educations}
		second={educations}
	/>
</section>

<style>
</style>
