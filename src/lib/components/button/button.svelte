<script lang="ts" module>
	import type { Button as ButtonTypes } from 'bits-ui';
	import { tv, type VariantProps } from 'tailwind-variants';

	const buttonVariants = tv({
		base: 'relative inline-flex select-none items-center justify-center rounded-lg border text-sm font-medium leading-4 outline-none transition-[background-color,border-color,color,transform,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-dm-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dm-bg-tertiary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
		variants: {
			variant: {
				filled: 'border-transparent text-white',
				outlined: 'bg-transparent',
				link: 'border-transparent bg-transparent px-0 underline-offset-4 hover:underline',
				blank: 'h-auto min-h-0 border-0 bg-transparent p-0 text-current'
			},
			color: {
				brand: '',
				primary: '',
				red: '',
				green: ''
			},
			size: {
				small: 'h-8 min-w-[60px] px-[11px] py-[3px] text-sm leading-[18px]',
				medium: 'h-10 min-w-[100px] px-[15px] py-[7px] text-base leading-[18px]',
				max: 'h-full min-h-full w-full min-w-full px-4 py-2 text-base'
			},
			static: {
				true: '',
				false: 'active:scale-[0.96]'
			}
		},
		compoundVariants: [
			{ variant: 'filled', color: 'brand', class: 'bg-dm-brand hover:bg-dm-brand-hover active:bg-dm-brand-active' },
			{ variant: 'filled', color: 'primary', class: 'bg-dm-bg-accent text-white hover:bg-dm-mod-strong active:bg-dm-border-strong' },
			{ variant: 'filled', color: 'red', class: 'bg-dm-red hover:bg-dm-red-hover active:bg-dm-red-active' },
			{ variant: 'filled', color: 'green', class: 'bg-dm-green hover:bg-dm-green-hover active:bg-dm-green-active' },
			{ variant: 'outlined', color: 'brand', class: 'border-dm-brand text-dm-brand hover:bg-dm-brand hover:text-white active:bg-dm-brand-active' },
			{ variant: 'outlined', color: 'primary', class: 'border-dm-border-normal text-dm-text hover:bg-dm-mod-normal active:bg-dm-mod-strong' },
			{ variant: 'outlined', color: 'red', class: 'border-dm-red text-dm-red hover:bg-dm-red hover:text-white active:bg-dm-red-active' },
			{ variant: 'outlined', color: 'green', class: 'border-dm-green text-dm-green hover:bg-dm-green hover:text-white active:bg-dm-green-active' },
			{ variant: 'link', color: 'brand', class: 'text-dm-brand' },
			{ variant: 'link', color: 'primary', class: 'text-dm-text' },
			{ variant: 'link', color: 'red', class: 'text-dm-red' },
			{ variant: 'link', color: 'green', class: 'text-dm-green' }
		],
		defaultVariants: {
			variant: 'filled',
			color: 'brand',
			size: 'medium',
			static: false
		}
	});

	export type ButtonProps = ButtonTypes.RootProps & VariantProps<typeof buttonVariants>;
</script>

<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		children,
		class: className,
		variant = 'filled',
		color = 'brand',
		size = 'medium',
		static: isStatic = false,
		...restProps
	}: ButtonProps = $props();

	let primitiveProps = $derived(restProps as ButtonPrimitive.RootProps);
</script>

<ButtonPrimitive.Root
	{...primitiveProps}
	class={cn(buttonVariants({ variant, color, size, static: isStatic }), className)}
>
	{@render children?.()}
</ButtonPrimitive.Root>
