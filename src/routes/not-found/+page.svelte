<script>
	export let status = 404;
	export let message = 'Страница не найдена';
</script>

<svelte:head>
	<title>Ошибка {status}</title>
</svelte:head>

<div class="error-page">
	<div class="error-content">
		<h1>Ошибка {status}</h1>
		<p>{message}</p>

		{#if status === 404}
			<p>Возможно, страница была перемещена или удалена.</p>
		{:else if status === 500}
			<p>Попробуйте обновить страницу или вернуться позже.</p>
		{/if}

		<a href="/" class="home-link">Вернуться на главную</a>
	</div>
</div>

<style>
    .error-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        text-align: center;
        padding: 1rem;
        background-color: #f8f9fa;
    }

    .error-content {
        max-width: 600px;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #dc3545;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        color: #6c757d;
    }

    .home-link {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    .home-link:hover {
        background-color: #0056b3;
    }
</style>