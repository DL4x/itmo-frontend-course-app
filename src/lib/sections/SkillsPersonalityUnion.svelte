<script lang="ts">
	import type { Skill } from '$lib';
	// import TwoColumnLayout from '$lib/TwoColumnLayout.svelte';
	import Skills from '$lib/sections/Skills.svelte';
	import Personality from '$lib/sections/Personality.svelte';

	interface Props {
		skills: Skill[];
	}

	const { skills }: Props = $props();
	// const skillsNew = [
	//     {
	//         name: "java",
	//       value: 50,
	//         id: 2,
	//     },
	// ];
	// const firstHalf = $derived(skills.slice(0, (skills.length - 1) / 2));
	// const secondHalf = $derived(skills.slice((skills.length - 1) / 2));
</script>

<section id="skills_personality_union_section">
	<div class="container">
		<div class="skills">
			<Skills skills={skills} />
		</div>
		<div class="personality">
			<Personality skills={skills} />
		</div>
	</div>
</section>

<style>
    .container {
        display: flex;
        gap: 3%
    }

    .skills,
    .personality {
        width: 50%;
        flex-grow: 1;
        padding: 5% 2%;
        border: 3px solid black;
        border-radius: 30px;
    }

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
