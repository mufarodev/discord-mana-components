<script lang="ts" module>
	import { cn } from '$lib/utils';
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const checkboxVariants = tv({
		base: 'flex items-center gap-3 select-none text-base text-dm-text',
		variants: {
			variant: {
				inline: 'flex-1 max-w-full relative',
				row: 'flex-1 max-w-full relative rounded-[3px] p-2.5 bg-dm-bg-secondary hover:bg-dm-mod-muted transition-colors duration-150 data-[state=checked]:bg-dm-bg-tertiary data-[state=checked]:text-white'
			}
		},
		defaultVariants: {
			variant: 'inline'
		}
	});

	export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
		VariantProps<typeof checkboxVariants>;
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'inline',
		checked = $bindable(false),
		children,
		...restProps
	}: CheckboxProps = $props();
</script>

<CheckboxPrimitive.Root
	bind:checked
	class={cn(
		checkboxVariants({ variant }),
		'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
>
	<div
		class={cn(
			'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-solid transition-colors duration-150',
			checked
				? 'bg-dm-brand border-dm-brand text-white'
				: 'bg-black/10 dark:bg-black/20 border-[#85858c] dark:border-white/40'
		)}
	>
		{#if checked}
			<svg
				class="h-4 w-4 stroke-current"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		{/if}
	</div>
	{#if children}
		<span class="font-medium">
			{@render children?.({ checked, indeterminate: false })}
		</span>
	{/if}
</CheckboxPrimitive.Root>
