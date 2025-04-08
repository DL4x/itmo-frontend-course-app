<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Lecturer resumes</title>
</svelte:head>

<main>
	<header>
		<h1>Welcome to ITMO Frontend Course</h1>
		<p>This site is a Work-in-Progress. You can view participants' resumes below.</p>
	</header>

	<section class="card-grid">
		{#each data.authors as author (author.documentId)}
			<a class="card" href="/resumes/{author.documentId}">
				<div class="avatar">
					<span>{author.name[0]}</span>
				</div>
				<h2>{author.name}</h2>
			</a>
		{/each}
	</section>
</main>

<style>
    @font-face {
        font-family: 'JetBrains Mono';
        font-weight: 500;
        font-style: normal;
        src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    }

    :global(body) {
        margin: 0;
        font-family: 'JetBrains Mono', monospace;
        color: #363e45;
        background-color: #f4f4f4;
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        text-align: center;
        margin-bottom: 3rem;
        font-family: 'JetBrains Mono', monospace;
    }

    header h1 {
        font-size: 2.8rem;
        margin-bottom: 0.8rem;
        color: #2c2c2c;
    }

    header p {
        font-size: 1.1rem;
        color: #666;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .card {
        text-decoration: none;
        color: inherit;
        background-color: #ffffff;
        border-radius: 16px;
        padding: 2rem 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.2s ease,
        box-shadow 0.2s ease;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    .card h2 {
        margin-top: 1rem;
        font-size: 1.3rem;
        color: #333;
    }

    .avatar {
        width: 64px;
        height: 64px;
        background-color: #ddd;
        color: #333;
        font-weight: bold;
        font-size: 1.4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 1024px) {
        .card-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .card-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
