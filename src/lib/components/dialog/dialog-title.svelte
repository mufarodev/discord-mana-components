<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	class={cn('text-[20px] font-semibold leading-[1.2] text-dm-text-strong break-words [overflow-wrap:break-word] [word-break:break-word]', className)}
	{...restProps}
/>
