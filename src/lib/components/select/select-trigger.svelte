<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = 'default',
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & {
		variant?: 'default' | 'modal';
	} = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	class={cn(
		'flex items-center justify-between h-11 bg-dm-bg-input border border-solid border-dm-border-subtle rounded-lg px-3 text-base text-dm-text select-none outline-none focus-visible:ring-2 focus-visible:ring-dm-brand cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
		variant === 'default' ? 'w-[400px] max-w-full' : 'w-full',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<svg class="h-5 w-5 text-dm-interactive-normal shrink-0 ml-2" viewBox="0 0 20 20" fill="currentColor">
		<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
	</svg>
</SelectPrimitive.Trigger>
