<script lang="ts">
	let email = $state('');
	let message = $state('');
	let isSubmitted = $state(false);
	let isLoading = $state(false);

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault()
		isLoading = true;
		await new Promise(resolve => setTimeout(resolve, 1500));
		isLoading = false;
		isSubmitted = true;
		email = '';
		message = '';
	};
</script>

<svelte:head>
	<title>Поддержка | Frontend Courses</title>
</svelte:head>

<div class="cosmic-background">
	<header class="stellar-header">
		<h1>🚀 Центр космической поддержки</h1>
		<p>Мы на связи, как спутник на орбите!</p>
	</header>

	<main class="nebula-container">
		{#if isSubmitted}
			<div class="success-message">
				<p>📡 Ваш сигнал принят! Скоро ответим!</p>
				<button class="launch-button" onclick={() => isSubmitted = false}>Отправить ещё одно сообщение</button>
			</div>
		{:else}
			<form class="contact-form" onsubmit={handleSubmit}>
				<div class="form-group">
					<label for="email">Ваш космический адрес:</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="user@galaxy.com"
						required
					/>
				</div>

				<div class="form-group">
					<label for="message">Текст сообщения:</label>
					<textarea
						id="message"
						bind:value={message}
						placeholder="Опишите вашу проблему или вопрос..."
						required></textarea>
				</div>

				<button class="launch-button" type="submit" disabled={isLoading}>
					{#if isLoading}
						⌛ Отправка...
					{:else}
						Отправить
					{/if}
				</button>
			</form>
		{/if}


    </main>

	<footer class="cosmic-footer">
		<p>© {new Date().getFullYear()} Frontend Cosmos. Все права защищены.</p>
	</footer>
</div>

<style>
    .cosmic-background {
        font-family: 'ALS Gorizont', sans-serif;
    }
    .stellar-header {
        text-align: center;
        margin-bottom: 3rem;
        animation: pulse 4s infinite;

        p {
            font-size: 1.2rem;
        }
    }

    .stellar-header h1 {
        font-size: 3.5rem;
        margin-top: 4rem;
        background: linear-gradient(90deg, #6ee7ff, #a855f7);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .nebula-container {
        max-width: 800px;
        margin: 0 auto;
        background: rgba(20, 30, 80, 0.5);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 0 30px rgba(100, 70, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(100, 150, 255, 0.2);
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    input, textarea {
        padding: 0.8rem;
        background: rgba(10, 15, 40, 0.7);
        border: 1px solid #3b3b8a;
        border-radius: 8px;
        color: white;
        font-size: 1rem;
        transition: all 0.3s;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: #6ee7ff;
        box-shadow: 0 0 0 2px rgba(110, 231, 255, 0.3);
    }

    .launch-button {
        background: #FE8A70;
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .launch-button {
        background: #FE8A70;
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
    }

    .launch-button:hover:not(:disabled) {
        background: #FF6B4D;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(254, 138, 112, 0.4);
    }

    .launch-button:active:not(:disabled) {
        transform: translateY(0);
    }

    .launch-button:disabled {
        background: #444;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .launch-button::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.5s;
    }

    .launch-button:hover::after {
        opacity: 1;
    }

    .success-message {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 16px;
        text-align: center;
        padding: 2rem;
        background: rgba(40, 160, 80, 0.2);
        border-radius: 8px;
        border: 1px solid rgba(40, 200, 100, 0.3);
    }

    .orbit-support {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px dashed rgba(100, 150, 255, 0.3);
        gap: 10px;
    }

    .orbit-support ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    .orbit-support a {
        color: #6ee7ff;
        text-decoration: none;
        transition: all 0.2s;
    }

    .orbit-support a:hover {
        color: #e879f9;
        text-decoration: underline;
    }

    .cosmic-footer {
        text-align: center;
        margin-top: 3rem;
        opacity: 0.7;
        font-size: 0.9rem;
    }

    @keyframes pulse {
        0% {
            opacity: 0.95;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.95;
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>