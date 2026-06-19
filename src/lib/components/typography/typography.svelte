<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const typographyVariants = tv({
		base: 'font-dm-primary leading-normal',
		variants: {
			variant: {
				h1: 'font-dm-display text-[32px] font-bold md:font-extrabold leading-[1.25] text-dm-text-strong',
				h2: 'font-dm-display text-[24px] font-bold leading-[1.25] text-dm-text-strong',
				h3: 'font-dm-display text-[20px] font-semibold leading-[1.2] text-dm-text-strong',
				h4: 'font-dm-display text-[16px] font-semibold leading-[1.25] text-dm-text-strong',
				eyebrow: 'text-[12px] font-bold uppercase tracking-[0.02em] leading-[1.33] text-dm-text-muted',
				'body-md': 'text-[16px] font-normal leading-[1.25] text-dm-text',
				'body-sm': 'text-[14px] font-normal leading-[1.28] text-dm-text',
				'body-xs': 'text-[12px] font-normal leading-[1.33] text-dm-text-muted',
				code: 'font-dm-code text-[12px] font-bold leading-[1.33] bg-dm-bg-secondary px-1 py-0.5 rounded border border-solid border-dm-border-subtle text-dm-text-strong'
			}
		},
		defaultVariants: {
			variant: 'body-sm'
		}
	});

	export type TypographyProps = HTMLAttributes<HTMLElement> &
		VariantProps<typeof typographyVariants> & {
			as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'code' | 'label';
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'body-sm',
		as,
		children,
		...restProps
	}: TypographyProps = $props();

	const defaultElements: Record<string, any> = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		eyebrow: 'span',
		'body-md': 'p',
		'body-sm': 'p',
		'body-xs': 'span',
		code: 'code'
	};

	let element = $derived(as || defaultElements[variant as string] || 'span');
</script>

<svelte:element
	this={element}
	class={cn(typographyVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
