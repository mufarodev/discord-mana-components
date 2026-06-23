<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-lg border text-sm font-medium leading-4 outline-none transition-[background-color,border-color,color,transform,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-dm-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dm-bg-tertiary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
		variants: {
			variant: {
				primary: 'border-transparent bg-dm-brand text-white hover:bg-dm-brand-hover active:bg-dm-brand-active',
				secondary: 'border-transparent bg-dm-bg-accent text-white hover:bg-dm-mod-strong active:bg-dm-border-strong',
				danger: 'border-transparent bg-dm-red text-white hover:bg-dm-red-hover active:bg-dm-red-active',
				success: 'border-transparent bg-dm-green text-white hover:bg-dm-green-hover active:bg-dm-green-active',
				outline: 'border-dm-border-normal bg-transparent text-dm-text hover:bg-dm-mod-normal active:bg-dm-mod-strong',
				'outline-primary': 'border-dm-brand bg-transparent text-dm-brand hover:bg-dm-brand hover:text-white active:bg-dm-brand-active',
				'outline-danger': 'border-dm-red bg-transparent text-dm-red hover:bg-dm-red hover:text-white active:bg-dm-red-active',
				'outline-success': 'border-dm-green bg-transparent text-dm-green hover:bg-dm-green hover:text-white active:bg-dm-green-active',
				link: 'border-transparent bg-transparent px-0 text-dm-brand underline-offset-4 hover:underline',
				blank: 'h-auto min-h-0 border-0 bg-transparent p-0 text-current'
			},
			size: {
				small: 'h-8 min-w-[60px] px-[11px] py-[3px] text-sm leading-[18px]',
				medium: 'h-10 min-w-[100px] px-[15px] py-[7px] text-base leading-[18px]',
				max: 'h-full min-h-full w-full min-w-full px-4 py-2 text-base'
			},
			static: {
				true: '',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'medium',
			static: false
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
	export type ButtonStatic = VariantProps<typeof buttonVariants>['static'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			static?: ButtonStatic;
			loading?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'primary',
		size = 'medium',
		static: isStatic = false,
		loading = false,
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-mana-component="button"
		class={cn(buttonVariants({ variant, size, static: isStatic }), className)}
		href={(disabled || loading) ? undefined : href}
		aria-disabled={disabled || loading}
		role={(disabled || loading) ? 'link' : undefined}
		tabindex={(disabled || loading) ? -1 : undefined}
		{...restProps}
	>
		<span class={cn("flex items-center justify-center gap-1 w-full h-full transition-all duration-200", loading && "opacity-0 -translate-y-full")}>
			{@render children?.()}
		</span>
		{#if loading}
			<span class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<span class="inline-flex items-center gap-[2px]">
					<span class="h-[6px] w-[6px] rounded-full bg-current animate-spinner-pulse"></span>
					<span class="h-[6px] w-[6px] rounded-full bg-current animate-spinner-pulse [animation-delay:0.2s]"></span>
					<span class="h-[6px] w-[6px] rounded-full bg-current animate-spinner-pulse [animation-delay:0.4s]"></span>
				</span>
			</span>
		{/if}
	</a>
{:else}
	<button
		bind:this={ref}
		data-mana-component="button"
		class={cn(buttonVariants({ variant, size, static: isStatic }), className)}
		{type}
		disabled={disabled || loading}
		{...restProps}
	>
		<span class={cn("flex items-center justify-center gap-1 w-full h-full transition-all duration-200", loading && "opacity-0 -translate-y-full")}>
			{@render children?.()}
		</span>
		{#if loading}
			<span class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<span class="inline-flex items-center gap-[2px]">
					<span class="h-[6px] w-[6px] rounded-full bg-current animate-spinner-pulse"></span>
					<span class="h-[6px] w-[6px] rounded-full bg-current animate-spinner-pulse [animation-delay:0.2s]"></span>
					<span class="h-[6px] w-[6px] rounded-full bg-current animate-spinner-pulse [animation-delay:0.4s]"></span>
				</span>
			</span>
		{/if}
	</button>
{/if}
