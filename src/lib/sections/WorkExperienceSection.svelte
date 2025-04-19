<script lang="ts">
	import EducationEntry from '$lib/entries/EducationEntry.svelte';
	// import TwoColumnLayout from '$lib/TwoColumnLayout.svelte';
	import type { Education } from '$lib';
	import WorkEntry from '$lib/entries/WorkEntry.svelte';

	interface Props {
		educations: Education[];
	}

	const { educations }: Props = $props();
    let firstHalf = educations;
    let secondHalf = educations;
</script>

<section id="work_experience_section">
	<h1>Work Experience</h1>
    <div class="content">
        <div class="content-column">
            {#each firstHalf as education (education.id)}
                <WorkEntry {...education} />
            {/each}
        </div>
        <div class="content-column">
            {#each secondHalf as education (education.id)}
                <WorkEntry {...education} />
            {/each}
        </div>
    </div>
</section>

<style>
    h1 {
        text-align: center;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .content {
        display: flex;
    }

    .content-column {
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: 50%;
        flex-grow: 1;
    }
</style>
