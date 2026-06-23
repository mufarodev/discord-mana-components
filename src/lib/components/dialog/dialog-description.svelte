<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
	bind:ref
	class={cn('text-[16px] font-normal leading-[1.25] text-dm-text-muted mt-2 break-words [overflow-wrap:break-word] [word-break:break-word]', className)}
	{...restProps}
/>
