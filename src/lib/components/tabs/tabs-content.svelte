<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let { class: className, value, ...restProps }: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content
	{value}
	class={cn('outline-none py-4', className)}
	{...restProps}
/>
