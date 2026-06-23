<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className,
		centered = false,
		leading,
		trailing,
		title,
		subtitle,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		centered?: boolean;
		leading?: Snippet;
		trailing?: Snippet;
		title?: Snippet | string;
		subtitle?: Snippet | string;
	} = $props();

	// Narrow type for the Svelte compiler so it doesn't complain about rendering Snippet | string
	const titleSnippet = $derived(title && typeof title !== 'string' ? (title as Snippet) : undefined);
	const subtitleSnippet = $derived(subtitle && typeof subtitle !== 'string' ? (subtitle as Snippet) : undefined);
</script>

<div
	class={cn('relative z-10 shrink-0 select-none [padding:var(--custom-modal-padding-md)_var(--custom-modal-padding)_var(--custom-modal-padding-sm)]', className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<div class="flex items-stretch">
			{#if leading}
				<div class="flex items-center shrink-0 mr-2 [margin-left:calc((var(--custom-modal-padding)-var(--space-8))*-1)] [margin-top:calc(var(--custom-modal-padding-md)*-1)] [padding-right:var(--space-12)]">
					{@render leading()}
				</div>
			{/if}
			
			<div class={cn("box-border flex-grow shrink min-w-0", centered && "text-center")}>
				{#if title}
					{#if typeof title === 'string'}
						<h2 class="text-[20px] font-semibold leading-[1.2] text-dm-text-strong break-words [overflow-wrap:break-word] [word-break:break-word]">
							{title}
						</h2>
					{:else if titleSnippet}
						<div class="text-[20px] font-semibold leading-[1.2] break-words [overflow-wrap:break-word] [word-break:break-word]">
							{@render titleSnippet()}
						</div>
					{/if}
				{/if}
				
				{#if subtitle}
					{#if typeof subtitle === 'string'}
						<p class="text-[16px] font-normal leading-[1.25] text-dm-text-muted mt-2 break-words [overflow-wrap:break-word] [word-break:break-word]">
							{subtitle}
						</p>
					{:else if subtitleSnippet}
						<div class="text-[16px] font-normal leading-[1.25] break-words [overflow-wrap:break-word] [word-break:break-word]">
							{@render subtitleSnippet()}
						</div>
					{/if}
				{/if}
			</div>

			{#if trailing}
				<div class="flex items-center shrink-0 ml-2 [margin-right:calc((var(--custom-modal-padding)-var(--space-8))*-1)] [margin-top:calc(var(--custom-modal-padding-md)*-1)] [padding-left:var(--space-12)]">
					{@render trailing()}
				</div>
			{/if}
		</div>
	{/if}
</div>
