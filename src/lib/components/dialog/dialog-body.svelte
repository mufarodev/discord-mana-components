<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- Spacer Top -->
<div class="shrink-0 [padding-top:var(--custom-modal-padding-md)]"></div>

<div
	class={cn(
		'flex-grow overflow-y-auto [padding-left:var(--custom-modal-padding)] [padding-right:var(--custom-modal-padding)]',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

<!-- Spacer Bottom -->
<div class="shrink-0 [padding-bottom:var(--custom-modal-padding-sm)]"></div>
