<script lang="ts">
    import type { Contact } from '$lib';

    interface Props {
        address?: Contact;
        phone?: Contact;
        email?: Contact;
    }

    const { address, phone, email }: Props = $props();
</script>

<section id="contacts_section">
    <h1>Contacts</h1>
    <div class="content">
        <div class="contact-box">
            {#if address}
                <div class="contact-item">
                    <enhanced:img
                        src="/src/images/pin.svg"
                        alt="email"
                        class="contact-icon"
                    />
                    <a href={address.href} class="contact-link">{address.value}</a>
                </div>
            {/if}
            {#if phone}
                <div class="contact-item">
                    <enhanced:img
                        src="/src/images/phone.svg"
                        alt="email"
                        class="contact-icon"
                    />
                    <a href={phone.href} class="contact-link">{phone.value}</a>
                </div>
            {/if}
            {#if email}
                <div class="contact-item">
                    <enhanced:img
                        src="/src/images/email.svg"
                        alt="email"
                        class="contact-icon"
                    />
                    <a href={email.href} class="contact-link">{email.value}</a>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    h1 {
        text-align: center;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .content {
        display: grid;
        gap: 32px;
        grid-template-columns: repeat(3, 1fr);
        display: flex;
        justify-content: center;
    }

    .contact-box {
        width: 50%;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 32px;
        align-items: center;
        height: 336px;
        padding: 32px;
        border-radius: 8px;
        background-color: #98a3ae1f;

    }

    .contact-item {
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        border: 2px solid black;
        border-radius: 30px;
        padding: 15px 40px;
    }

    a {
        text-align: center;
        font-size: larger;
    }
</style>
