<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let { class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	class={cn(
		'flex flex-row border-b-2 border-solid border-dm-border-subtle',
		className
	)}
	{...restProps}
/>
