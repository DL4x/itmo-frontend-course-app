<script lang="ts">
	import type { Skill } from '$lib';
	import SkillEntry from '$lib/entries/SkillEntry.svelte';
	import TwoColumnLayout from '$lib/sections/TwoColumnLayout.svelte';

	interface Props {
		skills: Skill[];
	}

	const { skills }: Props = $props();
	// const firstHalf = $derived(skills.slice(0, (skills.length - 1) / 2));
	// const secondHalf = $derived(skills.slice((skills.length - 1) / 2));
</script>

<section id="personality_section">
	<h1>Skills</h1>
	<TwoColumnLayout
		FirstComponent={SkillEntry}
		SecondComponent={SkillEntry}
		first={skills}
		second={skills}
	/>
	<!--	<div class="content">-->
	<!--		<div class="content-column">-->
	<!--			{#each firstHalf as skill (skill.id)}-->
	<!--				<SkillEntry {...skill} />-->
	<!--			{/each}-->
	<!--		</div>-->
	<!--		<div class="content-column">-->
	<!--			{#each secondHalf as skill (skill.id)}-->
	<!--				<SkillEntry {...skill} />-->
	<!--			{/each}-->
	<!--		</div>-->
	<!--	</div>-->
</section>

<style>
    /*.content {*/
    /*    display: flex;*/
    /*    gap: 32px;*/
    /*}*/

    /*.content-column {*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    gap: 32px;*/
    /*    flex: 1;*/
    /*}*/
</style>
