<script lang="ts">
    import '/src/app.css'
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';
    import { addAuthor, getAuthorByEmail } from '$lib/strapiRepository';
    import { userStore } from '$lib/store';

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

                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            display_name: username
                        }
                    }
                });
                if (signUpError) throw signUpError;

                await addAuthor(username, email);

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
                error = supabaseErrorMap[err.message]
            }
        } finally {
            loading = false;
        }
    };
    const supabaseErrorMap: Record<string, string> = {
        'Invalid login credentials': 'Неверный email или пароль',
        'User already registered': 'Пользователь уже зарегистрирован',
        'Email is not valid': 'Некорректный email',
        'Password should be at least 6 characters.': 'Пароль должен быть не короче 6 символов',
        'Unable to validate email address: invalid format': 'Неверный формат почты'
    };
</script>

<div class="nebula-container">
    <div class="stellar-header">
        <h1>{isSignUp ? 'Регистрация' : 'Вход'}</h1>
    </div>

    <div class="contact-form">
        {#if isSignUp}
            <div class="form-group">
                <input
                    bind:value={username}
                    type="text"
                    placeholder="Ваше имя"
                    required
                    class="auth-input"
                />
            </div>
        {/if}

        <div class="form-group">
            <input bind:value={email} type="email" placeholder="Email" required class="auth-input" />
        </div>

        <div class="form-group">
            <input bind:value={password} type="password" placeholder="Пароль" required class="auth-input" />
        </div>

        <button class="launch-button" on:click={handleAuth} disabled={loading}>
            {isSignUp ? 'Зарегистрироваться' : 'Войти'}
        </button>

        <button
            class="launch-button"
            on:click={() => (isSignUp = !isSignUp)}
            disabled={loading}
            style="background: rgba(10, 15, 40, 0.7); border: 1px solid #3b3b8a;"
        >
            {isSignUp ? 'Войти' : 'Зарегистрироваться'}
        </button>

        {#if error}
            <div class="error-message" style="color: #fe8a70; text-align: center; margin-top: 1rem;">
                {error}
            </div>
        {/if}
    </div>
</div>

<style>
    .nebula-container {
        max-width: 400px;
        margin: 2rem auto;
        background: rgba(20, 30, 80, 0.5);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 0 30px rgba(100, 70, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(100, 150, 255, 0.2);
        animation: fadeIn 0.4s ease-out;
    }

    .stellar-header h1 {
        font-size: 2.5rem;
        margin: 1rem 0;
        background: linear-gradient(90deg, #6ee7ff, #a855f7);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: pulse 4s infinite;
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

    .auth-input {
        padding: 0.8rem;
        background: rgba(10, 15, 40, 0.7);
        border: 1px solid #3b3b8a;
        border-radius: 8px;
        color: white;
        font-size: 1rem;
        transition: all 0.3s;
        width: 100%;
    }

    .auth-input:focus {
        outline: none;
        border-color: #6ee7ff;
        box-shadow: 0 0 0 2px rgba(110, 231, 255, 0.3);
    }

    .launch-button {
        background: #fe8a70;
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .launch-button:hover:not(:disabled) {
        background: #ff6b4d;
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
    .nebula-courses-container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 1rem;
    }

    .stellar-courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
    }

    .cosmic-card {
        background: rgba(20, 30, 80, 0.5);
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 0 30px rgba(100, 70, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(100, 150, 255, 0.2);
        transition: all 0.4s ease;
        overflow: hidden;
        position: relative;
    }

    .cosmic-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(100, 70, 255, 0.3);
        border-color: rgba(110, 231, 255, 0.4);
    }

    .cosmic-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #6ee7ff, #a855f7);
    }

    .cosmic-card h5 {
        font-size: 1.5rem;
        margin: 1rem 0;
        background: linear-gradient(90deg, #6ee7ff, #a855f7);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .cosmic-card p {
        color: rgba(200, 200, 255, 0.8);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }

    .stellar-button {
        background: linear-gradient(90deg, #6ee7ff, #a855f7);
        color: white;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 50px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
        display: inline-block;
        text-align: center;
        text-decoration: none;
    }

    .stellar-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(110, 231, 255, 0.4);
    }

    .stellar-button:active {
        transform: translateY(0);
    }

    .stellar-button::after {
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

    .stellar-button:hover::after {
        opacity: 1;
    }

    .cosmic-card-img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid rgba(100, 150, 255, 0.3);
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
</style>
