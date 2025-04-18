<script>
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import '/src/app.css';
</script>

<svelte:head>
	<title>ITMO Frontend Course</title>
</svelte:head>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20%;
		padding: 5% 10%;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 52px;
	}

	h1 {
		font-weight: 700;
		font-size: 7rem;
		line-height: 100%;
		letter-spacing: -0.02em;
		color: #141416;
	}

	p {
		font-weight: 400;
		font-size: 1.2rem;
		line-height: 150%;
		color: #000000;
	}

	.button {
		background-color: #141416;
		color: white;
		padding: 16px 24px;
		gap: 12px;
		border-radius: 90px;
		font-weight: bold;
		cursor: pointer;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.alien-img{
		width: 100%;
		height: 100%;
	}

	.button:hover {
		background-color: #333;
	}
</style>

<main>
	<div class="left">
		<h1>Рады вас<br>видеть!</h1>
		<p>
			Вы посетили сайт образовательных курсов по направлению фронтенда университета ИТМО. 
			Данный ресурс был создан выпускниками этих курсов.
		</p>
		<a class="button" href="#">Список курсов</a>
	</div>
	<img class="alien-img" src="/src/images/starting_page/alien.png" alt="Alien peeking" />
</main>