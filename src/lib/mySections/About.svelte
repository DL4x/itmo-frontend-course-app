<script lang="ts">
    interface ContactData {
        title: string;
        phone?: string;
        address?: string;
        birthDate?: string;
        links: {
            vk?: string;
            telegram?: string;
            instagram?: string;
            email?: string;
            github?: string;
            twitter?: string;
            linkedin?: string;
        };
    }

    let activeBlockContacts: boolean = false;

    const contacts: ContactData = {
        title: 'About',
        phone: '+7 (123) 456-78-90',
        address: 'Москва, ул. Примерная, 123',
        birthDate: '01.01.1990',
        links: {
            vk: 'https://vk.com/username',
            telegram: 'https://t.me/username',
            email: 'example@mail.com',
            github: 'https://github.com/username',
            linkedin: 'https://linkedin.com/in/username'
        }
    };

    // Фильтруем только существующие ссылки
    const activeLinks = Object.entries(contacts.links)
        .filter(([_, value]) => value)
        .map(([key, value]) => ({ type: key, url: value }));

    // Берем только первые 5 ссылок для основного отображения
    const visibleLinks = activeLinks.slice(0, 5);
    const hiddenLinksCount = activeLinks.length - visibleLinks.length;

    // Проверка наличия контактов
    const hasContacts =
        contacts.phone || contacts.address || contacts.birthDate || activeLinks.length > 0;

    let modalTitleContacts = '';
    let modalContacts: ContactData = contacts;
    function openModalContacts() {
        // event.preventDefault();
        modalTitleContacts = contacts.title;
        modalContacts = contacts;
        activeBlockContacts = true;
    }

    function closeModalContacts() {
        // event.preventDefault();
        activeBlockContacts = false;
    }
</script>

<div class="block contacts-block">
    <div class="title contacts-title">{contacts.title}</div>
    {#if hasContacts}
        <div class="contacts-content">
            {#if contacts.phone}
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>{contacts.phone}</span>
                </div>
            {/if}

            {#if contacts.address}
                <div class="contact-item">
                    <span class="contact-icon">🏠</span>
                    <span>{contacts.address}</span>
                </div>
            {/if}

            {#if contacts.birthDate}
                <div class="contact-item">
                    <span class="contact-icon">🎂</span>
                    <span>{contacts.birthDate}</span>
                </div>
            {/if}

            <div class="social-links">
                {#each visibleLinks as link}
                    <a href={link.url} target="_blank" class="social-link {link.type}">
                        {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                    </a>
                {/each}
            </div>
        </div>
    {:else}
        <div class="no-contacts">
            <img src="https://via.placeholder.com/100" alt="No contacts" class="no-contacts-img" />
            <div class="no-contacts-text">Contacts not found</div>
        </div>
    {/if}
    <div class="button-container">
        <button class="read-more-btn" on:click={openModalContacts}> Read more </button>
    </div>
</div>

{#if activeBlockContacts}
    <div class="modal-backdrop" on:click|self={closeModalContacts}>
        <div class="modal">
            <h2>{modalTitleContacts}</h2>
            <div class="modal-contacts">
                {#if modalContacts.phone}
                    <div class="contact-item">
                        <span class="contact-icon">📱</span>
                        <span>{modalContacts.phone}</span>
                    </div>
                {/if}

                {#if modalContacts.address}
                    <div class="contact-item">
                        <span class="contact-icon">🏠</span>
                        <span>{modalContacts.address}</span>
                    </div>
                {/if}

                {#if modalContacts.birthDate}
                    <div class="contact-item">
                        <span class="contact-icon">🎂</span>
                        <span>{modalContacts.birthDate}</span>
                    </div>
                {/if}

                <div class="modal-social-links">
                    {#each activeLinks as link}
                        <a href={link.url} target="_blank" class="social-link {link.type}">
                            {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                        </a>
                    {/each}
                </div>
            </div>
            <div class="modal-button-container">
                <button class="close-btn" on:click={closeModalContacts}> Close </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .block {
        position: relative;
        /* background: #f0f0f0;
        border: 1px solid #ccc;
        padding: 10px; */
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;
        
        flex: 1;
    }

    .contacts-title {
        text-align: center;
        margin-bottom: 15px;
        color: #333;

        font-size: 1.5rem;
        font-weight: 600;
    }

    .contacts-content {
        flex: 1;
    }

    .modal-contacts {
        flex: 1;
        overflow-y: auto;
        padding-right: 10px;
    }

    .modal-social-links {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 20px;
    }

    .button-container {

        /* position: relative; */
        height: 30px;
        /* display: flex; */
        /* justify-content: flex-end; */
    }

    .read-more-btn {
        position: absolute;
        right: 0;
        bottom: 0;

        padding: 5px 10px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    }

    .read-more-btn:hover {
        background: #45a049;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 60%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        min-height: 300px;
        max-height: 600px;
    }

    .modal-content {
        overflow: auto;
        flex: 1;
        white-space: pre-line; /* Сохраняет переносы строк */
        overflow-wrap: break-word;
    }

    .modal-button-container {
        display: flex;
        justify-content: flex-end;
    }

    .close-btn {
        padding: 8px 16px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
    }

    .close-btn:hover {
        background: #d32f2f;
    }

    .page.dimmed {
        filter: brightness(0.7);
        pointer-events: none;
        user-select: none;
    }
</style>
