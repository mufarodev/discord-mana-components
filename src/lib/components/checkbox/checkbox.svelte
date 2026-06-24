<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { tv, type VariantProps } from "tailwind-variants";
	import type { Snippet } from "svelte";

	export const checkboxVariants = tv({
		base: "group flex items-center gap-3 select-none text-base text-dm-text cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
		variants: {
			variant: {
				inline: "flex-1 max-w-full relative",
				row: "flex-1 max-w-full relative rounded-[3px] p-2.5 bg-dm-bg-secondary hover:bg-dm-mod-muted transition-colors duration-150 data-[state=checked]:bg-dm-bg-tertiary data-[state=checked]:text-white",
			},
		},
		defaultVariants: {
			variant: "inline",
		},
	});

	export type CheckboxProps = Omit<
		WithElementRef<HTMLInputAttributes>,
		"type"
	> &
		VariantProps<typeof checkboxVariants> & {
			checked?: boolean;
			children?: Snippet<[{ checked: boolean; indeterminate: boolean }]>;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "inline",
		checked = $bindable(false),
		disabled = false,
		ref = $bindable(null),
		children,
		...restProps
	}: CheckboxProps = $props();

	let animationState = $state<"animateIn" | "animateOut" | null>(null);
	let isInitial = true;

	$effect(() => {
		const currentChecked = checked;
		if (isInitial) {
			isInitial = false;
			return;
		}
		animationState = currentChecked ? "animateIn" : "animateOut";
	});
</script>

<label
	class={cn(
		checkboxVariants({ variant }),
		disabled && "opacity-50 cursor-not-allowed",
		className,
	)}
	data-state={checked ? "checked" : "unchecked"}
	data-disabled={disabled ? "" : undefined}
	data-mana-component="checkbox"
>
	<div
		class={cn(
			animationState,
			"relative w-5 h-5 shrink-0 flex items-center justify-center rounded-[var(--radius-xs,4px)] border border-solid transition-[background-color,border-color,outline] duration-150 ease-in-out group-has-[input:focus-visible]:outline group-has-[input:focus-visible]:outline-2 group-has-[input:focus-visible]:outline-dm-brand-accent group-has-[input:focus-visible]:-outline-offset-2",
			checked
				? "bg-dm-brand border-[hsla(240,4%,61%,0.12)] text-white group-hover:bg-dm-brand-hover active:bg-dm-brand-active active:border-[hsla(240,4%,61%,0.12)]"
				: "bg-black/8 border-[hsla(240,4%,61%,0.64)] group-hover:border-[hsla(240,4%,61%,0.8)] active:bg-dm-brand-active active:border-transparent",
		)}
		onanimationend={() => {
			animationState = null;
		}}
	>
		<svg
			class="dot-morph absolute inset-0 w-full h-full text-current pointer-events-none [transform-box:fill-box] [transform-origin:50%_50%]"
			viewBox="0 0 20 20"
			style:opacity={animationState ? undefined : 0}
			style:transform={animationState ? undefined : "scale(1)"}
		>
			<circle
				class="[transform-origin:10px_10px]"
				cx="10"
				cy="10"
				r="1.1"
				fill="currentColor"
			/>
		</svg>

		<svg
			class="check-morph absolute inset-0 w-full h-full text-white pointer-events-none [transform-box:fill-box] [transform-origin:50%_50%]"
			viewBox="0 0 24 24"
			fill="none"
			style:opacity={animationState ? undefined : checked ? 1 : 0}
			style:transform={animationState
				? undefined
				: checked
					? "scale(1)"
					: "scale(0.7)"}
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M19.06 6.94a1.5 1.5 0 0 1 0 2.12l-8 8a1.5 1.5 0 0 1-2.12 0l-4-4a1.5 1.5 0 0 1 2.12-2.12L10 13.88l6.94-6.94a1.5 1.5 0 0 1 2.12 0Z"
				clip-rule="evenodd"
			/>
		</svg>
	</div>

	{#if children}
		<span class="font-medium">
			{@render children?.({ checked, indeterminate: false })}
		</span>
	{/if}

	<input
		bind:this={ref}
		type="checkbox"
		class="sr-only"
		bind:checked
		{disabled}
		{...restProps}
	/>
</label>
