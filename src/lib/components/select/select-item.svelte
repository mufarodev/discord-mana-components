<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> & {
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	} = $props();

	let itemProps = $derived(restProps as any);
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	class={cn(
		'relative flex w-full cursor-pointer select-none items-center justify-between rounded-md p-2 text-sm text-dm-text outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-[rgba(78,80,88,0.3)] data-[highlighted]:text-dm-text-strong transition-colors duration-100',
		className
	)}
	{...itemProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="flex items-center gap-2">
			{#if children}
				{@render children({ selected, highlighted })}
			{:else}
				{label || value}
			{/if}
		</span>
		{#if selected}
			<svg class="h-4 w-4 text-dm-brand-accent shrink-0 ml-2" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
			</svg>
		{/if}
	{/snippet}
</SelectPrimitive.Item>
