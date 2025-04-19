<script lang="ts">
	import type { PageProps } from './$types';
	import WorkExperienceSection from '$lib/sections/WorkExperienceSection.svelte';
	import ContactsSection from '$lib/sections/ContactsSection.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import '/src/app.css';
	import FirstInfo from '$lib/sections/FirstInfo.svelte';
	import SkillsPersonalityUnion from '$lib/sections/SkillsPersonalityUnion.svelte';
	import Education from '$lib/sections/Education.svelte';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Resume</title>
</svelte:head>

<div class="Content bg-primary-100">
	<!-- <NavHeader /> -->
    <FirstInfo name={data.author.name} />
	<Education educations={data.author.educations} />
    <WorkExperienceSection educations={data.author.educations} />
    <SkillsPersonalityUnion skills={data.author.skills} />
	<ContactsSection
		address={data.author.address}
		email={data.author.email}
		phone={data.author.phone}
	/>
	<Footer />
</div>

<style>

    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'); /* DM Sans */

    .Content {
        width: 1140px;
        display: flex;
        gap: 120px;
        flex-direction: column;
        margin: auto;
        background-color: white;
    }

    /*@media screen and (max-width: 1140px) {
        .resume-content {
            width: auto;
        }
    }*/

    @font-face {
        font-family: 'JetBrains Mono';
        font-weight: 500;
        font-style: normal;
        src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    }

    /*.resume-content {
        font-family: 'JetBrains Mono', monospace;
        !* font-family: "DM Sans", sans-serif; *!
        display: flex;
        flex-flow: column;
        align-items: center;
        margin: 0 auto;
    }*/

    :global {
        .resume-content h1 {
            margin-block: 0;
            font-weight: 500;
            font-size: 3rem;
            line-height: 3rem;
            color: #363e45;
        }

        .resume-content h2 {
            margin-block: 0;
            font-weight: 500;
            font-size: 1.25rem;
            line-height: 1.5rem;
            color: #363e45;
        }

        .resume-content h3 {
            margin-block: 0;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5rem;
        }

        .resume-content > * {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
    }
</style>
