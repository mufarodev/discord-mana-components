<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let { class: className, value, ...restProps }: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	{value}
	class={cn(
		'pb-4 mr-8 -mb-[2px] cursor-pointer text-[#949ba4] dark:text-[#949ba4] light:text-[#6b6e75] font-medium hover:text-dm-interactive-hover data-[state=active]:text-dm-interactive-active data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-dm-brand transition-all duration-150 outline-none select-none focus-visible:ring-1 focus-visible:ring-dm-brand',
		className
	)}
	{...restProps}
/>
