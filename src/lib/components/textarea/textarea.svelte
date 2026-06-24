<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const textareaWrapperVariants = tv({
		base: 'relative flex w-full rounded-[var(--radius-sm)] border border-solid border-[hsla(240,4%,61%,0.2)] bg-black/12 text-dm-text transition-[border-color] duration-100 ease-in-out outline-none select-none input-wrapper min-h-[80px]',
		variants: {
			state: {
				default: 'hover:not-focus-within:border-[hsla(240,4%,61%,0.4)] focus-within:border-dm-brand [--custom-outline-color:var(--dm-brand)]',
				success: 'border-dm-green focus-within:border-dm-green-hover [--custom-outline-color:var(--dm-green)]',
				error: 'border-dm-red bg-dm-red/[0.04] focus-within:border-dm-red [--custom-outline-color:var(--dm-red)]'
			}
		},
		defaultVariants: {
			state: 'default'
		}
	});

	export const textareaVariants = textareaWrapperVariants;
	export type TextareaState = 'default' | 'success' | 'error';

	export type TextareaProps = WithElementRef<HTMLTextareaAttributes> & {
		state?: TextareaState;
		autosize?: boolean;
		resizeable?: boolean;
		showCounter?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		state = 'default',
		autosize = false,
		resizeable = false,
		showCounter = false,
		ref = $bindable(null),
		value = $bindable(''),
		disabled = false,
		readonly = false,
		maxlength,
		rows = 3,
		...restProps
	}: TextareaProps = $props();

	const currentLength = $derived(value ? `${value}`.length : 0);
	const counterText = $derived(`${currentLength} / ${maxlength || 0}`);
	const dynamicPaddingRight = $derived(maxlength && showCounter ? (7.23 * counterText.length + 10) : 10);

	function autoGrow(node: HTMLTextAreaElement) {
		function adjustHeight() {
			if (!autosize) return;
			node.style.height = 'auto';
			node.style.height = `${node.scrollHeight}px`;
		}

		node.addEventListener('input', adjustHeight);
		
		// Initial height adjustment
		setTimeout(adjustHeight, 0);

		return {
			update() {
				adjustHeight();
			},
			destroy() {
				node.removeEventListener('input', adjustHeight);
			}
		};
	}
</script>

<div
	class={cn(
		textareaWrapperVariants({ state }),
		disabled && 'opacity-50 cursor-not-allowed',
		className
	)}
	data-disabled={disabled}
	data-read-only={readonly}
	data-error={state === 'error'}
>
	<textarea
		bind:this={ref}
		bind:value
		{disabled}
		readonly={readonly}
		{maxlength}
		{rows}
		use:autoGrow
		data-mana-component="text-area"
		class={cn(
			'w-full bg-transparent border-none outline-none appearance-none color-inherit text-inherit font-dm-primary placeholder:text-[#80858f] placeholder:select-none disabled:cursor-not-allowed [padding:var(--space-12)_10px]',
			resizeable ? '[resize:auto]' : 'resize-none'
		)}
		style="padding-right: {dynamicPaddingRight}px;"
		{...restProps}
	></textarea>

	{#if maxlength && showCounter}
		<div class="absolute bottom-1.5 right-2 text-[10px] text-[#96979e] select-none font-dm-primary pointer-events-none">
			{counterText}
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
