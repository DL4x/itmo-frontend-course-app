<script>
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import '/src/app.css';
	import { userStore } from '../store.js';
	console.log($userStore)
</script>

<svelte:head>
	<title>ITMO Frontend Course</title>
</svelte:head>

<ButtonGroup>
	<Button href="/courses/bulboba">Open course page</Button>
	<Button href="/lectures/aboba">Open lecture page</Button>
	<Button href="/resumes">Open page with our resume</Button>
</ButtonGroup>