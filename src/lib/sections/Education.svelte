<script lang="ts">
	import EducationEntry from '$lib/entries/EducationEntry.svelte';
	// import TwoColumnLayout from '$lib/TwoColumnLayout.svelte';
	import type { Education } from '$lib';

	interface Props {
		educations: Education[];
	}

	const { educations }: Props = $props();
    let firstHalf = educations;
    let secondHalf = educations;
</script>

<section id="education_section">
	<h1>Education</h1>
    <div class="content">
        <div class="content-column">
            {#each firstHalf as education (education.id)}
                <EducationEntry {...education} />
            {/each}
        </div>
        <div class="content-column">
            {#each secondHalf as education (education.id)}
                <EducationEntry {...education} />
            {/each}
        </div>
    </div>
</section>

<style>
    h1 {
        text-align: center;
    }

    .content {
        display: flex;
        /* gap: 3% */
    }

    .content-column {
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: 50%;
        flex-grow: 1;
    }
</style>
