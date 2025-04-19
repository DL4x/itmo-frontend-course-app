<script lang="ts">
	import type { Skill } from '$lib';
	import SkillEntry from '$lib/entries/PersonalityEntry.svelte';
	// import TwoColumnLayout from '$lib/TwoColumnLayout.svelte';
    import Skills from '$lib/sections/Skills.svelte';
	import Personality from '$lib/sections/Personality.svelte';

	interface Props {
		skills: Skill[];
	}

	const { skills }: Props = $props();
	// const firstHalf = $derived(skills.slice(0, (skills.length - 1) / 2));
	// const secondHalf = $derived(skills.slice((skills.length - 1) / 2));
</script>

<section id="skills_personality_union_section">
    <h1>Skills and Personality</h1>
    <div class="container">
        <div class="skills"><Skills skills={skills} /></div>
        <div class="personality"><Personality skills={skills} /></div>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    h1 {
        text-align: center;
    }

    .container {
        display: flex;
        gap: 3%;
    }

    .skills,
    .personality {
        width: 50%;
        padding: 5% 2%;
        border: 3px solid black;
        border-radius: 30px;
        flex-grow: 1;
        align-self: center;
    }
</style>
