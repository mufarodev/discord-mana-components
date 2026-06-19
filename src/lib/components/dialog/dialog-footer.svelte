<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={cn('bg-dm-bg-secondary rounded-b-lg shrink-0 p-4 flex items-center justify-end gap-3 relative z-10', className)}
	{...restProps}
>
	{@render children?.()}
</div>
