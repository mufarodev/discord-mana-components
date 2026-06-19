<script lang="ts" module>
	import { cn } from '$lib/utils';
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	export type SegmentedControlProps = ComponentProps<typeof ToggleGroupPrimitive.Root>;
</script>

<script lang="ts">
	let {
		class: className,
		type = 'single',
		value = $bindable(),
		...restProps
	}: SegmentedControlProps = $props();

	let controlProps = $derived(restProps as any);
</script>

<ToggleGroupPrimitive.Root
	{type}
	bind:value
	class={cn(
		'grid grid-flow-col auto-cols-fr h-7 border border-solid border-[rgba(155,155,155,0.2)] rounded-md overflow-hidden bg-dm-bg-secondary w-24 max-w-full',
		className
	)}
	{...controlProps}
/>
