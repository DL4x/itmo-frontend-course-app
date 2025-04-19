<script lang="ts">
	import type { Skill } from '$lib';

	const { name, value }: Skill = $props();

    let numCircles = 10;
    let activeCircles = Math.floor(Math.random() * (numCircles - 1)) + 1;
    let activeColor = '#363e45';
    let inactiveColor = '#ddd';
</script>

<div class="content">
	<div class="name">{name}</div>
	<div class="circle-progress">
        {#each Array(numCircles) as _, i}
          <div
            class="circle"
            style="background-color: {i < activeCircles ? activeColor : inactiveColor};"
          ></div>
        {/each}
    </div>
</div>

<style>
    .circle-progress {
        display: flex;
        align-items: center;
        height: 8px;
        justify-content: space-between;
    }

    .circle {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .name {
        font-size: x-large;
        color: #363e45;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>
