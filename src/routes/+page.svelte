<script>
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import '/src/app.css';
	import { userStore } from '../store.js';
</script>

<svelte:head>
	<title>ITMO Frontend Course</title>
</svelte:head>

<ButtonGroup>
	<Button href="/courses/bulboba">Open course page</Button>
	<Button href="/lectures/arq2dsd6x96ajs01a9wd2n2n">Open lecture page</Button>
	<Button href="/resumes">Open page with our resume</Button>
</ButtonGroup>