<script lang="ts">
	import type { Skill } from '$lib';

	const { name, value }: Skill = $props();
</script>

<div class="content">
    <div class="double-name">
        <div class="name">{name}</div>
        <div class="name">{name}</div>
    </div>
	<div class="skill-progress">
		<hr style:width="{value}%" />
	</div>
</div>

<style>
    .double-name {
        display: flex;
        justify-content: space-between;
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

    .skill-progress {
        height: 8px;
        border-radius: 4px;
        background: #98a3ae1f;
    }

    hr {
        width: 100%;
        height: 8px;
        margin: 0;
        border: 0;
        border-radius: 4px;
        background: #363e45;
    }
</style>
