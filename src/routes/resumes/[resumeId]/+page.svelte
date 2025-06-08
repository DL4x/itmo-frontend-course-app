<script lang="ts">
    // import type { PageProps } from './$types';
    import '/src/app.css';
    import Grid from '$lib/sections/Grid.svelte';

    // const { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Resume</title>
</svelte:head>

<div class="Content text-black">
    <!-- <div class="resume-content"> -->
    <!-- <NavHeader /> -->
    <Grid />
    <!-- <FirstInfo name={data.author.name} />
        <Education educations={data.author.educations} />
        <WorkExperienceSection educations={data.author.educations} />
        <SkillsPersonalityUnion skills={data.author.skills} />
        <ContactsSection
            address={data.author.address}
            email={data.author.email}
            phone={data.author.phone}
        />
        <Footer /> -->
    <!-- </div> -->
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'); /* DM Sans */

    .Content {
        font-family: 'JetBrains Mono', monospace;
        /* width: 1140px; */
        width: 90%;
        display: flex;
        gap: 120px;
        flex-direction: column;
        margin: auto;
        /* background-color: white; */
        margin-top: 30px;
        /* background-color: rgb(247,245,245); */
    }

    @font-face {
        font-family: 'JetBrains Mono';
        font-weight: 500;
        font-style: normal;
        src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    }

    :global {
        h1 {
            margin-block: 0;
            font-weight: 500;
            font-size: 3rem;
            line-height: 3rem;
            color: #363e45;
        }

        h2 {
            margin-block: 0;
            font-weight: 500;
            font-size: 1.25rem;
            line-height: 1.5rem;
            color: #363e45;
        }

        h3 {
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
