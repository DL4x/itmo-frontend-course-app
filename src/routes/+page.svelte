<script lang="ts">
	//import { Button, ButtonGroup } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { Card, Button } from 'flowbite-svelte';
	import '/src/app.css';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>ITMO Frontend Course</title>
</svelte:head>

<style>
	.greeting-page-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20%;
		padding: 0 10%;
		height: 100vh;
		box-sizing: border-box;
	}

	.left {
		display: flex;
		flex: 1;
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

	h2 {
		font-weight: 550;
		font-size: 4rem;
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
		padding-bottom: 100px;
	}

	.button:hover {
		background-color: #333;
	}

	.course-list-container{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 100px;
		margin-bottom: 100px;
	}
</style>

<section class="greeting-page-container">
	<div class="left">
		<h1>Рады вас<br>видеть!</h1>
		<p>
			Вы посетили сайт образовательных курсов по направлению фронтенда университета ИТМО. 
			Данный ресурс был создан выпускниками этих курсов.
		</p>
		<a class="button" href="#main-page-courses">Список курсов</a>
	</div>
	<img class="alien-img" src="/src/images/starting_page/alien.png" alt="Alien peeking" />
</section>

<section class="course-list-container" id="main-page-courses">

	<h2>Курсы</h2>

	<div class="flex gap-15">
		<!-- Html/Css Card -->
		<Card 
		  img="/src/images/starting_page/paste_picture.webp"
		  class="bg-white border-1 border-[#B1B5C3] rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden"
		>
		  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Html/Css
		  </h5>
		  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
			Здесь вы ознакомитесь с основами
		  </p>
		  <Button class="bg-black text-white rounded-full px-6 py-2 w-32 hover:bg-gray-700 transition cursor-pointer">
			Подробнее
		  </Button>
		</Card>
	  
		<!-- Javascript Card -->
		<Card 
		  img="/src/images/starting_page/paste_picture.webp"
		  class="bg-white border-1 border-[#B1B5C3] rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden"
		>
		  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Javascript
		  </h5>
		  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
			Здесь вы узнаете о джаваскрипт
		  </p>
		  <Button class="bg-black text-white rounded-full px-6 py-2 w-32 hover:bg-gray-700 transition cursor-pointer">
			Подробнее
		  </Button>
		</Card>
	  
		<!-- Advanced module Card -->
		<Card 
		  img="/src/images/starting_page/paste_picture.webp"
		  class="bg-white border-1 border-[#B1B5C3] rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden"
		>
		  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Advanced module
		  </h5>
		  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
			Здесь хранятся познания всего мира
		  </p>
		  <Button class="bg-black text-white rounded-full px-6 py-2 w-32 hover:bg-gray-700 transition cursor-pointer">
			Подробнее
		  </Button>
		</Card>
	</div>
</section>