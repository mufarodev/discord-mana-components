<script lang="ts" module>
	import { cn } from '$lib/utils';
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const avatarVariants = tv({
		base: 'relative inline-block select-none shrink-0 rounded-full',
		variants: {
			size: {
				16: 'w-4 h-4 text-[8px]',
				24: 'w-6 h-6 text-[10px]',
				32: 'w-8 h-8 text-xs',
				80: 'w-20 h-20 text-xl',
				120: 'w-[120px] h-[120px] text-3xl'
			}
		},
		defaultVariants: {
			size: 32
		}
	});

	export type AvatarSize = VariantProps<typeof avatarVariants>['size'];
	export type AvatarStatus = 'online' | 'idle' | 'dnd' | 'offline' | 'none';

	export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & {
		src?: string;
		alt?: string;
		fallback?: string;
		size?: AvatarSize;
		status?: AvatarStatus;
		statusBorderColor?: string;
	};
</script>

<script lang="ts">
	let {
		class: className,
		src,
		alt,
		fallback,
		size = 32,
		status = 'none',
		statusBorderColor,
		...restProps
	}: AvatarProps = $props();

	const statusColors = {
		online: 'bg-dm-status-online',
		idle: 'bg-dm-status-idle',
		dnd: 'bg-dm-status-dnd',
		offline: 'bg-dm-status-offline'
	};

	const statusDotSizes: Record<any, string> = {
		16: 'w-1.5 h-1.5 border-0 -bottom-[1px] -right-[1px]',
		24: 'w-[9px] h-[9px] border-[1.5px] -bottom-[1px] -right-[1px]',
		32: 'w-[11px] h-[11px] border-2 -bottom-[2px] -right-[2px]',
		80: 'w-[22px] h-[22px] border-[4px] -bottom-[4px] -right-[4px]',
		120: 'w-[30px] h-[30px] border-[6px] -bottom-[6px] -right-[6px]'
	};
</script>

<div class="relative inline-block shrink-0">
	<AvatarPrimitive.Root
		class={cn(avatarVariants({ size }), className)}
		{...restProps}
	>
		<AvatarPrimitive.Image
			{src}
			{alt}
			class="h-full w-full rounded-full object-cover"
		/>
		<AvatarPrimitive.Fallback
			class="flex h-full w-full items-center justify-center rounded-full bg-dm-brand text-white font-semibold select-none"
		>
			{fallback || alt?.slice(0, 2).toUpperCase() || 'DM'}
		</AvatarPrimitive.Fallback>
	</AvatarPrimitive.Root>

	{#if status !== 'none'}
		<div
			class={cn(
				'absolute rounded-full border-solid shrink-0',
				statusColors[status],
				statusDotSizes[size as any] || statusDotSizes[32],
				statusBorderColor || 'border-dm-bg-tertiary'
			)}
			data-slot="status"
			data-status={status}
		></div>
	{/if}
</div>
