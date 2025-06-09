<script>
    const profile = {
        photo: "/src/images/profileImages/1.png",
        name: "Иванов Иван Иванович",
        birthDate: "15.03.1990",
        age: 34,
        phone: "+7 (123) 456-78-90",
        city: "Москва",
        bio: "Frontend-разработчик с 5-летним опытом работы. Специализируюсь на Svelte, React и TypeScript. Увлечен созданием интуитивно понятных и производительных пользовательских интерфейсов.",
        links: [
            { icon: "/src/images/github.png", url: "https://github.com/username", label: "GitHub" },
            { icon: "/src/images/telegram.png", url: "https://t.me/username", label: "Telegram" },
            { icon: "/src/images/email.png", url: "mailto:user@example.com", label: "Email" }
        ]
    };
</script>

<div class="profile-block">
    <header class="header">
        <enhanced:img
            alt="Profile Photo"
            class="photo"
            src="/src/images/profileImages/1.png"
            width="300px"
        />
        <div class="info">
            <h1>{profile.name}</h1>
            <div class="details">
                {profile.birthDate} <span>({profile.age} лет)</span>
            </div>
            <div class="contacts">
                {profile.phone} | {profile.city}
            </div>
        </div>
    </header>

    <section class="bio">
        <p>{profile.bio}</p>
    </section>

    <div class="social">
        {#each profile.links as { icon, url, label }}
            <a href={url} target="_blank" class="link" aria-label={label}>
                <img src={icon} alt={label} class={"icon " + label} />
            </a>
        {/each}
    </div>
</div>

<style>
    .profile-block {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 2rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header {
        display: flex;
        gap: 2rem;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .photo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #f0f4f8;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .info {
        flex: 1;
    }

    h1 {
        font-size: 1.8rem;
        margin: 0 0 0.5rem;
        color: #1a202c;
    }

    .details {
        font-size: 1.1rem;
        color: #4a5568;
        margin-bottom: 1rem;
    }

    .details span {
        color: #718096;
    }

    .contacts {
        font-size: 1rem;
        color: #2d3748;
    }

    .bio {
        margin: 2rem 0;
        padding: 1.5rem;
        background: #f8fafc;
        border-radius: 8px;
        line-height: 1.6;
        color: #4a5568;
    }

    .social {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        padding: 1rem;
    }

    .link {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #f0f4f8;
        transition: all 0.3s ease;
    }

    .link:hover {
        transform: translateY(-3px);
        background: #e2e8f0;
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    .Telegram {
        color: red;
    }

    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
        }
        
        h1 {
            font-size: 1.5rem;
        }
    }
</style>