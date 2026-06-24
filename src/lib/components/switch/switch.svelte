<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils";
	import type { HTMLInputAttributes } from "svelte/elements";

	export type SwitchProps = Omit<
		WithElementRef<HTMLInputAttributes>,
		"type" | "role"
	> & {
		checked?: boolean;
		hasIcon?: boolean;
	};
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { Tween } from "svelte/motion";
	import { linear } from "svelte/easing";
	import { getRectProp, getPath1, getPath2, interpolate } from "./utils";

	let {
		class: className,
		checked = $bindable(false),
		disabled = false,
		hasIcon = false,
		ref = $bindable(null),
		...restProps
	}: SwitchProps = $props();

	let isPressed = $state(false);
	let isHovered = $state(false);
	let reducedMotion = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);
		reducedMotion = mediaQuery.matches;
		const listener = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
		};
		mediaQuery.addEventListener("change", listener);
		return () => mediaQuery.removeEventListener("change", listener);
	});

	let targetEa = $derived(
		isPressed ? (checked ? 0.9 : 0.1) : checked ? 1 : 0,
	);

	const ea = new Tween(checked ? 1 : 0, {
		duration: () => (reducedMotion ? 200 : 300),
		easing: linear,
	});

	$effect(() => {
		ea.set(targetEa, {
			duration: reducedMotion ? 200 : 300,
		});
	});

	let turningOn = $derived(checked !== isPressed);

	let rectWidth = $derived(
		getRectProp("width", ea.current, turningOn, reducedMotion),
	);
	let rectHeight = $derived(
		getRectProp("height", ea.current, turningOn, reducedMotion),
	);
	let rectRx = $derived(getRectProp("rx", ea.current, turningOn, reducedMotion));
	let rectX = $derived(getRectProp("x", ea.current, turningOn, reducedMotion));
	let rectY = $derived(getRectProp("y", ea.current, turningOn, reducedMotion));

	let thumbLeft = $derived(
		reducedMotion
			? interpolate(ea.current, [0, 0.1, 0.9, 1], [1, 1, 24, 24])
			: interpolate(
					ea.current,
					[0, 0.1, 0.4, 0.6, 0.9, 1],
					[1, 1, 1, 24, 24, 24],
				),
	);

	let t = $derived(interpolate(ea.current, [0, 0.1, 0.9, 1], [0, 0, 1, 1]));

	let trackBg = $derived(
		`color-mix(in srgb, ${isHovered ? "var(--dm-brand-hover)" : "var(--dm-brand)"} ${t * 100}%, rgba(0, 0, 0, 0.12))`,
	);

	let trackBorder = $derived(
		`color-mix(in srgb, var(--dm-border-subtle) ${t * 100}%, ${isHovered ? "var(--dm-border-strong)" : "var(--dm-border-normal)"})`,
	);

	let iconColor = $derived(
		`color-mix(in srgb, var(--dm-brand) ${t * 100}%, #2e3036)`,
	);

	let iconPath1 = $derived(getPath1(t));
	let iconPath2 = $derived(getPath2(t));

	function handlePointerDown(e: PointerEvent) {
		if (e.button === 0 && !disabled) {
			isPressed = true;
		}
	}

	function handlePointerUp() {
		isPressed = false;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if ((e.key === " " || e.key === "Enter") && !disabled) {
			isPressed = true;
		}
	}

	function handleKeyUp() {
		isPressed = false;
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label
	class={cn(
		"group relative inline-block select-none cursor-pointer border-box focus-within:outline-none",
		disabled &&
			"opacity-50 cursor-not-allowed data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
		className,
	)}
	data-disabled={disabled ? "" : undefined}
	onpointerenter={() => {
		if (!disabled) isHovered = true;
	}}
	onpointerleave={() => {
		isHovered = false;
		isPressed = false;
	}}
	onpointerdown={handlePointerDown}
	onpointerup={handlePointerUp}
	onpointercancel={() => {
		isPressed = false;
	}}
>
	<div
		class="relative w-12 h-6 border border-solid rounded-[16px] transition-[outline] duration-150 flex items-center box-border group-has-[input:focus-visible]:outline group-has-[input:focus-visible]:outline-2 group-has-[input:focus-visible]:outline-dm-brand-accent group-has-[input:focus-visible]:-outline-offset-2"
		style:background-color={trackBg}
		style:border-color={trackBorder}
		data-mana-component="switch"
	>
		<svg
			class="absolute pointer-events-none flex items-center justify-center shrink-0"
			viewBox="0 0 24 24"
			style:width="24px"
			style:height="24px"
			style:left="{thumbLeft}px"
			style:margin="-1px"
		>
			<rect
				fill="#fff"
				x={rectX}
				y={rectY}
				width={rectWidth}
				height={rectHeight}
				rx={rectRx}
			/>
			{#if hasIcon}
				<path
					d={iconPath1}
					stroke={iconColor}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d={iconPath2}
					stroke={iconColor}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/if}
		</svg>
	</div>

	<input
		bind:this={ref}
		type="checkbox"
		role="switch"
		class="sr-only"
		bind:checked
		{disabled}
		aria-checked={checked}
		onkeydown={handleKeyDown}
		onkeyup={handleKeyUp}
		{...restProps}
	/>
</label>
