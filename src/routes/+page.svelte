<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/button';
	import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '$lib/components/dialog';
	import { Input } from '$lib/components/input';
	import { Textarea } from '$lib/components/textarea';
	import { Checkbox } from '$lib/components/checkbox';
	import { Switch } from '$lib/components/switch';
	import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '$lib/components/tooltip';
	import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '$lib/components/select';
	import { SegmentedControl, SegmentedControlItem } from '$lib/components/segmented-control';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/tabs';
	import { ScrollArea } from '$lib/components/scroll-area';
	import { ChatMessageRow } from '$lib/components/chat-message-row';
	import { MessageReaction } from '$lib/components/message-reaction';
	import { MessageEmbed } from '$lib/components/message-embed';
	import { Avatar } from '$lib/components/avatar';
	import { ChannelListItem } from '$lib/components/channel-list-item';
	import { NotificationBadge } from '$lib/components/notification-badge';
	import { Typography } from '$lib/components/typography';

	let isDialogOpen = $state(false);
	let isButtonLoading = $state(false);
	function triggerLoadingAction() {
		isButtonLoading = true;
		setTimeout(() => {
			isButtonLoading = false;
		}, 3000);
	}
	let inputValue = $state('');
	let textareaValue = $state('');
	let checkboxInline = $state(false);
	let checkboxRow = $state(true);
	let switchChecked = $state(true);
	let selectValue = $state('brand');
	let segmentValue = $state<any>('allow');
	let activeTab = $state('chat-preview');

	let reactionCount = $state(12);
	let hasReacted = $state(false);

	const selectItems = [
		{ value: 'brand', label: 'Blurple Theme' },
		{ value: 'green', label: 'Forest Green' },
		{ value: 'red', label: 'Ruby Red' },
		{ value: 'primary', label: 'Classic Muted' }
	];
</script>

<TooltipProvider>
	<div class="min-h-screen w-full bg-dm-bg-tertiary text-dm-text p-6 md:p-12 font-dm-primary">
		<div class="max-w-6xl mx-auto flex flex-col gap-10">
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-solid border-dm-border-subtle pb-6">
				<div class="flex flex-col gap-1">
					<Typography variant="h1" class="font-extrabold tracking-tight">Mana UI Component Playground</Typography>
					<Typography variant="body-md" class="text-dm-text-muted">A dedicated, modular showcase of all 16 implemented Discord client components.</Typography>
				</div>
				<button onclick={toggleMode} aria-label="Toggle Theme" class="flex items-center justify-center w-11 h-11 rounded-lg border border-solid border-dm-border-subtle bg-dm-bg-secondary hover:bg-dm-mod-muted text-dm-text cursor-pointer transition-colors duration-150">
					{#if mode.current === 'dark'}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{/if}
				</button>
			</div>

			<!-- Component Showcase Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Card 1: Buttons -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">1. Buttons</Typography>
					<div class="flex flex-wrap gap-3">
						<Button variant="primary" size="medium">Primary</Button>
						<Button variant="secondary" size="medium">Secondary</Button>
						<Button variant="danger" size="medium">Danger</Button>
						<Button variant="success" size="medium">Success</Button>
						<Button variant="outline" size="medium">Outline</Button>
						<Button variant="outline-primary" size="medium">Outline Brand</Button>
						<Button variant="outline-danger" size="medium">Outline Danger</Button>
						<Button variant="outline-success" size="medium">Outline Success</Button>
						<Button variant="link" size="medium">Link style</Button>
						<Button variant="blank" size="medium" class="text-dm-brand font-semibold hover:underline">Blank style</Button>
						<Button variant="primary" size="medium" loading>Loading State</Button>
						<Button variant="outline" size="medium" loading={isButtonLoading} onclick={triggerLoadingAction}>
							{isButtonLoading ? "Processing..." : "Trigger 3s Loading"}
						</Button>
					</div>
				</div>

				<!-- Card 2: Modals / Dialog -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">2. Modals</Typography>
					<div>
						<Button variant="primary" onclick={() => isDialogOpen = true}>Open Discord-style Modal</Button>
						<Dialog bind:open={isDialogOpen}>
							<DialogContent size="medium">
								<DialogHeader>
									<DialogTitle>System Action Alert</DialogTitle>
									<DialogDescription>Proceeding will purge all local guild cached memory permanently. This cannot be undone.</DialogDescription>
								</DialogHeader>
								<div class="p-6">
									<Typography variant="body-sm">The purge is irreversible and takes approximately 15 seconds to run.</Typography>
								</div>
								<DialogFooter>
									<Button variant="outline" onclick={() => isDialogOpen = false}>Cancel</Button>
									<Button variant="danger" onclick={() => isDialogOpen = false}>Purge Cache</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<!-- Card 3: Inputs & Textarea -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">3. Text Fields</Typography>
					<div class="flex flex-col gap-3">
						<Input placeholder="Standard text input field..." bind:value={inputValue} />
						<Input placeholder="Success state input field..." state="success" />
						<Input placeholder="Error state input field..." state="error" />
						<Textarea placeholder="Textarea multi-line text input field..." bind:value={textareaValue} />
					</div>
				</div>

				<!-- Card 4: Selection & Toggles -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">4. Selection & Toggles</Typography>
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-6">
							<Checkbox bind:checked={checkboxInline}>Inline Checklist</Checkbox>
							<Switch bind:checked={switchChecked} />
						</div>
						<Checkbox variant="row" bind:checked={checkboxRow}>Row checkbox container (Highlights on select)</Checkbox>
						
						<div class="flex items-center gap-4">
							<span class="text-sm font-semibold">Dropdown Select:</span>
										<Select type="single" bind:value={selectValue} items={selectItems}>
								<SelectTrigger class="w-48">
									<SelectValue placeholder="Theme" />
								</SelectTrigger>
								<SelectContent>
									{#each selectItems as item}
										<SelectItem value={item.value}>{item.label}</SelectItem>
									{/each}
								</SelectContent>
							</Select>
						</div>

						<div class="flex items-center gap-4">
							<span class="text-sm font-semibold">Segment Control:</span>
							<SegmentedControl type="single" bind:value={segmentValue}>
								<SegmentedControlItem value="deny" action="deny">Deny</SegmentedControlItem>
								<SegmentedControlItem value="neutral">Neutral</SegmentedControlItem>
								<SegmentedControlItem value="allow" action="allow">Allow</SegmentedControlItem>
							</SegmentedControl>
						</div>
					</div>
				</div>

				<!-- Card 5: Tooltips & Badges -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">5. Tooltips & Badges</Typography>
					<div class="flex items-center gap-6">
						<Tooltip>
							<TooltipTrigger class="outline-none">
								<Button variant="outline">Hover over me</Button>
							</TooltipTrigger>
							<TooltipContent side="top">Tooltip popover bubble info!</TooltipContent>
						</Tooltip>

						<div class="flex items-center gap-2">
							<span class="text-sm font-semibold">Pills:</span>
							<NotificationBadge />
							<NotificationBadge count={7} />
							<NotificationBadge count={120} />
						</div>
					</div>
				</div>

				<!-- Card 6: Avatars & Status -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">6. Avatars & Statuses</Typography>
					<div class="flex flex-wrap items-center gap-4">
						<Avatar size={16} status="online" fallback="US" />
						<Avatar size={24} status="idle" fallback="A1" />
						<Avatar size={32} status="dnd" fallback="SZ" />
						<Avatar size={80} status="offline" fallback="ME" />
						<Avatar size={120} status="online" fallback="DM" />
					</div>
				</div>

				<!-- Card 7: Channel List Items -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">7. Channel List Items</Typography>
					<div class="flex flex-col gap-1 p-2 bg-dm-bg-secondary rounded border border-solid border-dm-border-subtle">
						<ChannelListItem name="TEXT CHANNELS" type="category" />
						<ChannelListItem name="general" type="text" state="selected" />
						<ChannelListItem name="announcements" type="text" state="unread" />
						<ChannelListItem name="meeting-stage" type="stage" state="default" />
						<ChannelListItem name="lounge-voice" type="voice" state="muted" />
					</div>
				</div>

				<!-- Card 8: Tab Bar & Scrollbars -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">8. Tab Bar & ScrollArea</Typography>
					<div class="flex flex-col gap-3">
						<Tabs bind:value={activeTab}>
							<TabsList>
								<TabsTrigger value="chat-preview">Chat Element Preview</TabsTrigger>
								<TabsTrigger value="embed-preview">Rich Embed Preview</TabsTrigger>
							</TabsList>
							<TabsContent value="chat-preview">
								<ScrollArea variant="fade" class="h-32 p-2 bg-dm-bg-secondary rounded border border-solid border-dm-border-subtle">
									<div class="flex flex-col gap-2">
										<ChatMessageRow author="Bot" timestamp="Today at 1:12 PM" authorColor="#5966f2">
											Hi! This ScrollArea uses the dynamic auto-hide "fade" scrollbar. Scroll down to trigger it.
										</ChatMessageRow>
										<ChatMessageRow author="Moderator" timestamp="Today at 1:15 PM" highlight="mentioned">
											Cozy chat rows can render custom highlighted borders, and reactions pills.
										</ChatMessageRow>
										<div class="pl-[72px] flex items-center">
											<MessageReaction
												emoji="👍"
												count={reactionCount}
												reacted={hasReacted}
												onclick={() => {
													hasReacted = !hasReacted;
													reactionCount += hasReacted ? 1 : -1;
												}}
											/>
										</div>
									</div>
								</ScrollArea>
							</TabsContent>
							<TabsContent value="embed-preview">
								<MessageEmbed
									provider="Mana UI System"
									author="Emily Kowalski"
									title="Design spec & clean styling"
									description="Message rich embeds provide responsive 4px vertical color bars (accent border) and custom grids."
									accentColor="#008545"
								/>
							</TabsContent>
						</Tabs>
					</div>
				</div>

				<!-- Card 9: Typography scale -->
				<div class="flex flex-col gap-4 p-6 bg-dm-bg-primary rounded-lg border border-solid border-dm-border-subtle shadow-dm-surface md:col-span-2">
					<Typography variant="h3" class="border-b border-solid border-dm-border-subtle pb-1.5 font-bold">9. Typography scale</Typography>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="flex flex-col gap-3">
							<Typography variant="h1">Header XXL (32px)</Typography>
							<Typography variant="h2">Header XL (24px)</Typography>
							<Typography variant="h3">Header LG (20px)</Typography>
							<Typography variant="h4">Header MD (16px)</Typography>
						</div>
						<div class="flex flex-col gap-3">
							<Typography variant="eyebrow">Eyebrow Label (12px uppercase)</Typography>
							<Typography variant="body-md">Body Medium text (16px)</Typography>
							<Typography variant="body-sm">Body Standard text (14px)</Typography>
							<Typography variant="body-xs">Body Muted / Small text (12px)</Typography>
							<div>
								<Typography variant="code">const spec = new ManaComponentSpec();</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</TooltipProvider>
