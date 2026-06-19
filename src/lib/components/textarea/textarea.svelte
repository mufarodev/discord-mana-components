<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const textareaVariants = tv({
		base: 'w-full px-[10px] py-3 text-base rounded-lg border border-transparent bg-dm-bg-input text-dm-text transition-all duration-200 ease-in-out outline-none placeholder:text-[#80858f] placeholder:select-none disabled:opacity-50 disabled:cursor-not-allowed resize-none min-h-[80px]',
		variants: {
			state: {
				default: 'hover:border-dm-interactive-hover hover:dark:border-[#111214] hover:light:border-[#c4c9cc] focus-visible:border-dm-brand',
				success: 'border-dm-green focus-visible:border-dm-green-hover',
				error: 'border-dm-red border-2 text-dm-red focus-visible:border-dm-red-active'
			}
		},
		defaultVariants: {
			state: 'default'
		}
	});

	export type TextareaState = VariantProps<typeof textareaVariants>['state'];
	export type TextareaProps = WithElementRef<HTMLTextareaAttributes> & {
		state?: TextareaState;
	};
</script>

<script lang="ts">
	let {
		class: className,
		state = 'default',
		ref = $bindable(null),
		value = $bindable(undefined),
		...restProps
	}: TextareaProps = $props();
</script>

<textarea
	bind:this={ref}
	bind:value
	class={cn(textareaVariants({ state }), className)}
	{...restProps}
></textarea>
