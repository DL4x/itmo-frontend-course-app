<script lang="ts">
	import type { Skill } from '$lib';
	import SingleSkill from '$lib/entries/SingleSkill.svelte';

	interface Props {
		skills: Skill[];
	}

	const { skills }: Props = $props();
</script>

<section id="personality_section">
	<h1>Skills</h1>
    <div class="content">
        {#each skills as skill (skill.id)}
            <SingleSkill {...skill} />
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
       
    }
</style>
