<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { Heading } from 'flowbite-svelte';
	import { getAuthorByEmail } from '$lib/strapiRepository';
	import { userStore } from '../store'

	let email = '';
	let password = '';
	let username = '';
	let error = '';
	let loading = false;
	let isSignUp = false;

	async function fetchUser() {
		return await getAuthorByEmail(email);
	}

	const handleAuth = async () => {
		try {
			loading = true;
			error = '';

			if (isSignUp) {
				if (!username.trim()) {
					throw new Error('Пожалуйста, введите ваше имя');
				}

				const { data: authData, error: signUpError } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: {
							display_name: username
						}
					}
				});

				if (signUpError) throw signUpError;

				const { error: profileError } = await supabase
					.from('profiles')
					.insert([{
						id: authData.user?.id,
						username,
						email
					}]);
				if (profileError) throw profileError;
				const user = await fetchUser();
				userStore.set(user);
				goto('/');

			} else {
				const { error: signInError } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) throw signInError;
				const user = await fetchUser();
				userStore.set(user);
				goto('/');
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			}
		} finally {
			loading = false;
		}
	};


</script>

<div>
	<Heading tag="h1" class="auth-heading">{isSignUp ? 'Регистрация' : 'Вход'}</Heading>

	{#if isSignUp}
		<input
			bind:value={username}
			type="text"
			placeholder="Ваше имя"
			required
			class="auth-input"
		/>
	{/if}

	<input
		bind:value={email}
		type="email"
		placeholder="Email"
		required
		class="auth-input"
	/>
	<input
		bind:value={password}
		type="password"
		placeholder="Пароль"
		required
		class="auth-input"
	/>

	<button
		class="auth-button auth-button--primary"
		on:click={handleAuth}
		disabled={loading}
	>
		{isSignUp ? 'Зарегистрироваться' : 'Войти'}
	</button>

	<button
		class="auth-button auth-button--secondary"
		on:click={() => isSignUp = !isSignUp}
		disabled={loading}
	>
		{isSignUp ? 'Войти' : 'Зарегистрироваться'}
	</button>

	{#if error}<p class="error">{error}</p>{/if}
</div>
<style>
    div {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    :global(h1) {
        color: #2d3748;
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 2rem;
        font-weight: 600;
    }

    input {
        width: 100%;
        padding: 0.75rem 1rem;
        margin-bottom: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: rgb(235, 79, 39);
        box-shadow: 0 0 0 3px rgba(235, 79, 39, 0.2);
    }

    Button {
        width: 100%;
        padding: 0.75rem;
        margin-top: 0.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    Button:first-of-type {
        background-color: rgb(235, 79, 39);
        color: white;
    }

    Button:first-of-type:hover {
        background-color: #e46b32;
    }

    Button:last-of-type {
        background-color: transparent;
        color: rgb(235, 79, 39);
        border: 1px solid #e2e8f0;
    }

    Button:last-of-type:hover {
        background-color: #f8fafc;
        border-color: rgb(235, 79, 39);
    }

    Button[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .error {
        color: #ef4444;
        text-align: center;
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #fee2e2;
        border-radius: 6px;
        font-size: 0.9rem;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    div {
        animation: fadeIn 0.4s ease-out;
    }
</style>