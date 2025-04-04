<script lang="ts">
	import type { Skill } from '$lib';

	const { name, value }: Skill = $props();
</script>

<style>
	h3 {
      color: #363E45;
	}
  .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
  }

  .skill-progress {
      height: 8px;
      border-radius: 4px;
      background: #98A3AE1F;
  }

  hr {
			width: 100%;
      height: 8px;
      margin: 0;
      border: 0;
      border-radius: 4px;
      background: #363E45;
  }
</style>

<div class="content">
	<h3>{name}</h3>
	<div class="skill-progress">
		<hr style:width="{value}%"/>
	</div>
</div>