<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import '/src/app.css';
	import { page } from '$app/state';
	let { children } = $props();
</script>
<Navbar class="m-auto lg:w-5xl">
	<NavBrand href="/">
		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/640px-Svelte_Logo.svg.png" class="me-3 h-6 sm:h-9" alt="Svelte framkework logo"/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ITMO Frontend Courses</span>
	</NavBrand>
	<div class="flex md:order-2">
		<DarkMode />
		<NavHamburger />
	</div>
	<NavUl class="order-1" activeUrl={page.url.pathname}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/courses">Courses</NavLi>
		<NavLi href="/resumes">Resumes</NavLi>
	</NavUl>

</Navbar>
{@render children()}