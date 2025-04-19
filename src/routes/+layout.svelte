<script lang="ts">
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '/src/app.css';
	import { page } from '$app/state';
	import VerticalLine from '$lib/VerticalLine.svelte';

	let { children } = $props();
</script>

<Navbar class="sticky top-0 z-1000 bg-white shadow-sm" navContainerClass="gap-8">
	<NavBrand href="/">
		<enhanced:img class="w-20 h-20" src="/src/images/ufo.png" alt="Main logo" />
	</NavBrand>
	<VerticalLine lineHeight="40px" class="not-md:hidden"/>

	<NavBrand class="flex flex-row gap-4 md:ml-auto md:order-last">
		<NavHamburger />
		<Button href="/auth">Войти</Button>
	</NavBrand>
	<NavUl activeUrl={page.url.pathname}>
		<NavLi href="/">Главная</NavLi>
		<NavLi href="/resumes" activeClass="">О нас</NavLi>
		<NavLi href="/" activeClass="">Поддержка</NavLi>
	</NavUl>
</Navbar>
{@render children()}