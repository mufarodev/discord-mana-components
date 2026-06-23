<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className,
		leading,
		trailing,
		trailingFullWidth = false,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		leading?: Snippet;
		trailing?: Snippet;
		trailingFullWidth?: boolean;
	} = $props();
</script>

<div
	class={cn('relative z-10 shrink-0 [padding:var(--custom-modal-padding-md)_var(--custom-modal-padding)_var(--custom-modal-padding-sm)]', className)}
	{...restProps}
>
	<div class="flex flex-wrap items-center [gap:var(--custom-modal-padding)_var(--space-8)]">
		{#if leading}
			<div class="flex-grow shrink min-w-0 break-words [overflow-wrap:break-word] [word-break:break-word]">
				{@render leading()}
			</div>
		{/if}

		{#if trailing || children}
			<div
				class={cn(
					'flex flex-wrap shrink-0 grow-0 [gap:var(--space-8)] ml-auto max-w-full',
					trailingFullWidth && 'w-full !ml-0 [&>*]:flex-1 [&_.actionButtonWrapper\_\_8a031]:flex-1'
				)}
			>
				{#if trailing}
					{@render trailing()}
				{:else if children}
					{@render children()}
				{/if}
			</div>
		{/if}
	</div>
</div>
