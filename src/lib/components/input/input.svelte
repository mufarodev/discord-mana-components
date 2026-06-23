<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { Snippet } from 'svelte';

	export const inputWrapperVariants = tv({
		base: 'relative flex items-center w-full rounded-[var(--radius-sm)] border border-solid border-[hsla(240,4%,61%,0.2)] bg-black/12 text-dm-text transition-[border-color] duration-100 ease-in-out select-none input-wrapper',
		variants: {
			size: {
				sm: 'h-8 px-3',
				md: 'h-10 px-3'
			},
			state: {
				default: 'hover:not-focus-within:border-[hsla(240,4%,61%,0.4)] focus-within:border-dm-brand [--custom-outline-color:var(--dm-brand)]',
				success: 'border-dm-green focus-within:border-dm-green-hover [--custom-outline-color:var(--dm-green)]',
				error: 'border-dm-red bg-dm-red/[0.04] focus-within:border-dm-red [--custom-outline-color:var(--dm-red)]'
			}
		},
		defaultVariants: {
			size: 'md',
			state: 'default'
		}
	});

	export const inputVariants = inputWrapperVariants;
	export type InputState = 'default' | 'success' | 'error';

	export type InputProps = WithElementRef<Omit<HTMLInputAttributes, 'size'>> & {
		state?: InputState;
		size?: 'sm' | 'md';
		leading?: Snippet;
		trailing?: Snippet;
		showClear?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		state = 'default',
		size = 'md',
		ref = $bindable(null),
		value = $bindable(undefined),
		leading,
		trailing,
		showClear = false,
		disabled = false,
		readonly = false,
		...restProps
	}: InputProps = $props();

	function handleClear() {
		value = '';
	}
</script>

<div
	class={cn(
		inputWrapperVariants({ size, state }),
		leading && 'ps-1',
		(trailing || (showClear && value)) && 'pe-1',
		disabled && 'opacity-50 cursor-not-allowed',
		className
	)}
	data-disabled={disabled}
	data-read-only={readonly}
	data-error={state === 'error'}
>
	{#if leading}
		<div class="flex items-center justify-center shrink-0 mr-1.5 text-[#abacb2]">
			{@render leading()}
		</div>
	{/if}

	<input
		bind:this={ref}
		bind:value
		{disabled}
		readonly={readonly}
		data-mana-component="text-input"
		class="w-full h-full bg-transparent border-none outline-none text-base text-dm-text placeholder:text-[#80858f] placeholder:select-none disabled:cursor-not-allowed font-dm-primary"
		{...restProps}
	/>

	{#if showClear && value}
		<button
			type="button"
			onclick={handleClear}
			class="flex items-center justify-center shrink-0 ml-1.5 text-[#abacb2] hover:text-[#fbfbfb] transition-colors duration-100 ease-in-out cursor-pointer outline-none"
			aria-label="Clear input"
		>
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	{/if}

	{#if trailing}
		<div class="flex items-center justify-center shrink-0 ml-1.5 text-[#abacb2]">
			{@render trailing()}
		</div>
	{/if}
</div>

<style>
	:global(.input-wrapper) {
		outline: none;
	}

	:global(.input-wrapper:not([data-read-only="true"]):focus-within) {
		outline: 2px solid var(--custom-outline-color);
		outline-offset: -2px;
	}

	:global(.input-wrapper[data-error="true"]:not([data-read-only="true"]):not([data-disabled="true"]):not(:focus-within):hover) {
		outline: 2px solid var(--dm-red);
		outline-offset: -2px;
	}
</style>
