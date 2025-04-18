<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import '/src/app.css';
	import { page } from '$app/state';
	import VerticalLine from '$lib/VerticalLine.svelte';

	let { children } = $props();
</script>

<Navbar class="m-auto lg:w-5xl" navContainerClass="md:justify-start gap-8">
	<NavBrand href="/">
		<enhanced:img class="w-20 h-20" src="/src/images/ufo.png" alt="Main logo" />
	</NavBrand>
	<VerticalLine height="40px"/>
	<NavHamburger />
	<NavUl class="order-1" activeUrl={page.url.pathname}>
		<NavLi href="/">Main</NavLi>
		<NavLi href="/" activeClass=""><a href="/">About us</a></NavLi>
		<NavLi href="/" activeClass=""><a href="/">Support</a></NavLi>
	</NavUl>
	<div class="ml-auto pl-2.5 order-3 flex gap-2">
		<Button href="/auth">Sign In</Button>
	</div>
</Navbar>
{@render children()}