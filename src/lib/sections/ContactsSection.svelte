<script lang="ts">
	import type { Contact } from '$lib';
	import ContactEntry from '$lib/entries/ContactEntry.svelte';

	interface Props {
		address?: Contact;
		phone?: Contact;
		email?: Contact;
	}

	const { address, phone, email }: Props = $props();
</script>

<style>
    .content {
        display: grid;
        gap: 32px;
        grid-template-columns: repeat(3, 1fr);
    }

    .contact-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 336px;
        padding: 32px;
        border-radius: 8px;
        background-color: #98A3AE1F;
    }

    @media (max-width: 1024px) {
        .content {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .content {
            grid-template-columns: 1fr;
        }
    }
</style>

<section id="contacts_section">
	<h1>Contacts</h1>
	<div class="content">
		<div class="contact-box">
			<enhanced:img class="image" src="/src/images/pin.svg" alt="Logo of map pin" width="40" height="40" />
			<ContactEntry name="Address" contact={address} />
		</div>
		<div class="contact-box">
			<enhanced:img class="image" src="/src/images/phone.svg" alt="Logo of ringing phone" width="40"
						  height="40" />
			<ContactEntry name="Phone" contact={phone} />
		</div>
		<div class="contact-box">
			<enhanced:img class="image" src="/src/images/email.svg" alt="Logo of email" width="40" height="40" />
			<ContactEntry name="Email" contact={email} />
		</div>
	</div>
</section>