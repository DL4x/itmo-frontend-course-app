<script lang="ts">
	import type { Skill } from '$lib';
	import PersonalityEntry from '$lib/entries/PersonalityEntry.svelte';

	interface Props {
		skills: Skill[];
	}

	const { skills }: Props = $props();
</script>

<section id="personality_section">
	<h1>Personality</h1>
    <div class="content">
        {#each skills as skill (skill.id)}
            <PersonalityEntry {...skill} />
        {/each}
    </div>
</section>

<style>
	h1 {
		text-align: center;
	}

    .content {
       display: flex;
       gap: 40px;
	   flex-direction: column;
	   margin: 0 3%;
    }

    section {
       display: flex;
       flex-direction: column;
       gap: 32px;
       flex: 1;
    }
</style>
