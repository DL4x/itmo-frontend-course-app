<script lang="ts">
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '/src/app.css';
	import { page } from '$app/state';
	import VerticalLine from '$lib/VerticalLine.svelte';

	let { children } = $props();
</script>

<style>
    .nav-container {
        gap: 2rem;
    }

    .logo-image {
        width: 5rem;
        height: 5rem;
    }

    .nav-brand-right {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }


    @media (min-width: 768px) {
        .nav-brand-right {
            margin-left: auto;
            order: 2;
        }
        .vertical-line {
            display: block;
        }

    }

    @media (max-width: 767px) {
        .vertical-line {
            display: none;
        }
    }

    .enhanced-img {
        height: 80px;
        width: 80px;
    }
    .navbar {
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
</style>

<Navbar class="navbar bg-white shadow-sm" navContainerClass="gap-8">
	<NavBrand href="/">
		<enhanced:img class="enhanced-img" src="/src/images/ufo.png" alt="Main logo" />
	</NavBrand>
	<VerticalLine lineHeight="40px" class="not-md:hidden"/>

	<NavBrand class="flex flex-row gap-4 md:ml-auto md:order-last">
		<NavHamburger />
		<Button href="/auth">Войти</Button>
	</NavBrand>
	<NavUl activeUrl={page.url.pathname}>
		<NavLi href="/">Главная</NavLi>
		<NavLi href="/resumes">О нас</NavLi>
		<NavLi href="/" activeClass="">Поддержка</NavLi>
	</NavUl>
</Navbar>
{@render children()}