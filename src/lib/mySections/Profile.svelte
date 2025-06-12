<script lang="ts">
    import type { Contact } from '$lib';

    interface Props {
        name: string;
        phone?: Contact;
        email: Contact;
        authorBirthday: string;
        authorCity: string;
        authorDescription: string;
        authorTelegram: string;
        authorGithub: string;
    }

    const {
        name,
        phone,
        email,
        authorBirthday,
        authorCity,
        authorDescription,
        authorTelegram,
        authorGithub
    }: Props = $props();

    function calculateAge(birthDateString: string) {
        const today = new Date();
        const [day, month, year] = birthDateString.split('.');
        const birthDate = new Date(`${year}-${month}-${day}`);
        const age = today.getFullYear() - birthDate.getFullYear();
        return today.setFullYear(1970) < birthDate.setFullYear(1970) ? age - 1 : age;
    }

    interface Link {
        icon: string;
        url: string;
        label: string;
    }

    const links: Link[] = [
        { icon: '/src/images/github.png', url: authorGithub, label: 'GitHub' },
        {
            icon: '/src/images/telegram.png',
            url: `https://t.me/${authorTelegram.substring(1)}`,
            label: 'Telegram'
        },
        { icon: '/src/images/email.png', url: email.href, label: 'Email' }
    ];
</script>

<div class="profile-block">
    <header class="header">
        <enhanced:img alt="Profile Photo" class="photo" src="/static/profile/1.png" width="300px" />
        <div class="info">
            <h1>{name}</h1>
            <div class="details">
                {authorBirthday} <span>({calculateAge(authorBirthday)} лет)</span>
            </div>
            <div class="contacts">
                {phone?.value} | {authorCity}
            </div>
        </div>
    </header>

    <section class="bio">
        <p>{authorDescription}</p>
    </section>

    <div class="social">
        {#each links as { icon, url, label }}
            <a href={url} target="_blank" class="link" aria-label={label}>
                <img src={icon} alt={label} class="icon" />
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
        color: #ffebe0;
    }

    .details {
        font-size: 1.1rem;
        color: #a8a29e;
        margin-bottom: 1rem;
    }

    .details span {
        color: #a8a29e;
    }

    .contacts {
        font-size: 1rem;
        color: #a8a29e;
    }

    .bio {
        margin: 2rem 0;
        padding: 1.5rem;
        border-radius: 8px;
        line-height: 1.6;
        background: rgba(51, 69, 161, 0.2);
        border: 1px solid #3b3b8a;
        color: white;

        overflow-wrap: break-word;
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

    @media (max-width: 400px) {
        .profile-block {
            width: 100%;
            padding: 0;
        }

        .bio {
            width: 80%;
            padding: 1rem;
        }

        .header {
            width: 100%
        }

        .info {
            width: 90%;
        }
    }
</style>
