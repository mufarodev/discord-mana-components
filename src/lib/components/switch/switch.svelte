<script lang="ts" module>
	import { cn } from '$lib/utils';
	import { Switch as SwitchPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;
</script>

<script lang="ts">
	let {
		class: className,
		checked = $bindable(false),
		...restProps
	}: SwitchProps = $props();
</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		'relative inline-flex h-6 w-[42px] shrink-0 cursor-pointer items-center rounded-full border border-solid transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-dm-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dm-bg-tertiary disabled:cursor-not-allowed disabled:opacity-50',
		checked
			? 'bg-dm-brand border-[rgba(155,155,155,0.12)]'
			: 'bg-black/12 border-[rgba(155,155,155,0.2)]',
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		class={cn(
			'pointer-events-none block h-[18px] w-[18px] rounded-full shadow-lg ring-0 transition-transform duration-150 ease-in-out',
			checked
				? 'translate-x-[20px] bg-white'
				: 'translate-x-0.5 bg-[#61636e] dark:bg-white'
		)}
	/>
</SwitchPrimitive.Root>
