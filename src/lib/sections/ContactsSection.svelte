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

<section id="contacts_section">
	<h1>Contacts</h1>
	<div class="content">
		<div class="contact-box">
			<enhanced:img
				alt="Logo of map pin"
				class="image"
				height="40"
				src="/src/images/pin.svg"
				width="40"
			/>
			<ContactEntry contact={address} name="Address" />
		</div>
		<div class="contact-box">
			<enhanced:img
				alt="Logo of ringing phone"
				class="image"
				height="40"
				src="/src/images/phone.svg"
				width="40"
			/>
			<ContactEntry contact={phone} name="Phone" />
		</div>
		<div class="contact-box">
			<enhanced:img
				alt="Logo of email"
				class="image"
				height="40"
				src="/src/images/email.svg"
				width="40"
			/>
			<ContactEntry contact={email} name="Email" />
		</div>
	</div>
</section>

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
        background-color: #98a3ae1f;
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
