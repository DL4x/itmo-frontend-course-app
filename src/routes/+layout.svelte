<script lang="ts">
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '/src/app.css';
	import { page } from '$app/state';
	import VerticalLine from '$lib/VerticalLine.svelte';

	let { children } = $props();
</script>

<Navbar class="sticky top-0 z-1000 bg-[#4A4E69] shadow-sm min-h-[5vh] flex items-center" navContainerClass="gap-8">
	<NavBrand href="/">
		<enhanced:img src="/src/images/ufo-flying.png" alt="Main logo" />
	</NavBrand>
	<VerticalLine lineHeight="40px" class="not-md:hidden"/>

	<NavBrand class="flex flex-row gap-4 md:ml-auto md:order-last">
		<NavHamburger />
		<Button href="/auth">Войти</Button>
	</NavBrand>
	<NavUl activeUrl={page.url.pathname}>
		<NavLi href="/" class="text-[#FFEBE0]" activeClass="">Главная</NavLi>
		<NavLi href="/resumes" class="text-[#FFEBE0]" activeClass="">О нас</NavLi>
		<NavLi href="/" class="text-[#FFEBE0]" activeClass="">Поддержка</NavLi>
	</NavUl>
</Navbar>
{@render children()}