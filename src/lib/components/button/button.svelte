<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = HTMLButtonAttributes & {
		children?: Snippet;
	};

	let { children, type = 'button', ...restProps }: ButtonProps = $props();
</script>

<button {type} {...restProps}>
	{@render children?.()}
</button>
