<script lang="ts">
	import type { PageProps } from './$types';
	import NavHeader from '$lib/sections/NavHeader.svelte';
	import AboutMeSection from '$lib/sections/AboutMeSection.svelte';
	import EducationSection from '$lib/sections/EducationSection.svelte';
	import WorkExperienceSection from '$lib/sections/WorkExperienceSection.svelte';
	import SkillsSection from '$lib/sections/SkillsSection.svelte';
	import ContactsSection from '$lib/sections/ContactsSection.svelte';
	import Footer from '$lib/sections/Footer.svelte';

	const { data }: PageProps = $props();
</script>

<style>
    .Content {
        width: 1140px;
        display: flex;
        gap: 120px;
        flex-direction: column;
        margin: auto;
    }

    @media screen and (max-width: 1140px) {
        .Content {
            width: auto;
        }
    }

    @font-face {
        font-family: 'JetBrains Mono';
        font-weight: 500;
        font-style: normal;
        src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    }

    .Content {
        font-family: "JetBrains Mono", monospace;
        display: flex;
        flex-flow: column;
        align-items: center;
        margin: 0 auto;
    }
		:global {
				.Content h1 {
            margin-block: 0;
            font-weight: 500;
            font-size: 3rem;
            line-height: 3rem;
            color: #363E45;
				}
        .Content h2 {
            margin-block: 0;
            font-weight: 500;
            font-size: 1.25rem;
            line-height: 1.5rem;
            color: #363E45;
        }
        .Content h3 {
            margin-block: 0;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5rem;
        }

        .Content > * {
						width: 100%;
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
		}
</style>

<svelte:head>
	<title>Resume</title>
</svelte:head>

<div class="Content">
	<NavHeader />
	<AboutMeSection name={data.author.name} />
	<EducationSection educations={data.author.educations}/>
	<WorkExperienceSection />
	<SkillsSection skills={data.author.skills}/>
	<ContactsSection address={data.author.address} phone={data.author.phone} email={data.author.email}/>
	<Footer />
</div>