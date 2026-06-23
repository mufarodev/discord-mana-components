<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: HTMLLabelAttributes = $props();
</script>

<label
	class={cn(
		'font-dm-medium text-[16px] font-medium leading-[1.25] text-dm-text-strong select-none cursor-pointer flex items-center [margin-bottom:var(--space-8)] [gap:var(--space-4)]',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</label>