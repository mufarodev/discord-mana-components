<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/button';
	import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '$lib/components/dialog';
	import { Input } from '$lib/components/input';
	import { Textarea } from '$lib/components/textarea';
	import { Checkbox } from '$lib/components/checkbox';
	import { Switch } from '$lib/components/switch';
	import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/tooltip';
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
	let inputValue = $state('');
	let textareaValue = $state('');
	let checkboxInline = $state(false);
	let checkboxRow = $state(true);
	let switchChecked = $state(true);
	let selectValue = $state('brand');
	let segmentValue = $state<any>('allow');
	let activeTab = $state('chat');

	let reaction1 = $state(12);
	let reaction1Reacted = $state(false);
	let reaction2 = $state(5);
	let reaction2Reacted = $state(true);

	const selectItems = [
		{ value: 'brand', label: 'Blurple Theme' },
		{ value: 'green', label: 'Forest Green' },
		{ value: 'red', label: 'Ruby Red' },
		{ value: 'primary', label: 'Classic Muted' }
	];
</script>

<div class="flex h-screen w-screen overflow-hidden bg-dm-bg-tertiary text-dm-text font-dm-primary">
	<!-- Left Guilds Column -->
	<div class="flex flex-col items-center gap-2 py-3 w-[72px] bg-[#1e1f22] shrink-0 border-r border-solid border-black/20">
		<Tooltip>
			<TooltipTrigger class="outline-none">
				<button onclick={toggleMode} aria-label="Toggle Theme" class="relative flex items-center justify-center w-12 h-12 rounded-3xl bg-dm-bg-accent text-white hover:rounded-2xl hover:bg-dm-brand transition-all duration-200 cursor-pointer">
					{#if mode.current === 'dark'}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{/if}
				</button>
			</TooltipTrigger>
			<TooltipContent side="right">Toggle Theme</TooltipContent>
		</Tooltip>

		<div class="w-8 h-[2px] bg-white/10 rounded my-1"></div>

		<Tooltip>
			<TooltipTrigger class="outline-none">
				<div class="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-dm-brand text-white shrink-0 cursor-pointer">
					<span class="font-bold text-sm">MANA</span>
					<div class="absolute -bottom-1 -right-1">
						<NotificationBadge count={3} />
					</div>
				</div>
			</TooltipTrigger>
			<TooltipContent side="right">Mana UI Server</TooltipContent>
		</Tooltip>
	</div>

	<!-- Sidebar Column (Channels & Profiles) -->
	<div class="flex flex-col w-60 bg-dm-bg-secondary shrink-0 border-r border-solid border-black/10">
		<!-- Header -->
		<div class="flex items-center justify-between px-4 h-12 border-b border-solid border-black/10 select-none">
			<Typography variant="h4" class="truncate font-bold">Discord Mana UI</Typography>
			<svg class="w-5 h-5 text-dm-interactive-normal" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
			</svg>
		</div>

		<!-- Scrollable Lanes -->
		<ScrollArea class="flex-1 p-2">
			<div class="flex flex-col gap-[2px]">
				<ChannelListItem name="Information" type="category" state="default" />
				<ChannelListItem name="announcements" type="text" state="default">
					<svg class="w-4 h-4 text-dm-interactive-normal hover:text-dm-interactive-hover" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v10.5m-6-10.5v10.5m-6-10.5v10.5" />
					</svg>
				</ChannelListItem>
				<ChannelListItem name="welcome" type="text" state="unread" />

				<div class="h-4"></div>

				<ChannelListItem name="Text Channels" type="category" state="default" />
				<ChannelListItem name="general" type="text" state="selected">
					<svg class="w-4 h-4 text-dm-interactive-normal hover:text-dm-interactive-hover" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
					</svg>
				</ChannelListItem>
				<ChannelListItem name="reusable-showcase" type="text" state="default" />
				<ChannelListItem name="spam-box" type="text" state="muted" />

				<div class="h-4"></div>

				<ChannelListItem name="Voice Channels" type="category" state="default" />
				<ChannelListItem name="General Voice" type="voice" state="default" />
				<ChannelListItem name="Stage Channel" type="stage" state="default" />
			</div>
		</ScrollArea>

		<!-- Footer User Profile Panel -->
		<div class="flex items-center justify-between p-2 h-[52px] bg-black/15 border-t border-solid border-black/10 shrink-0">
			<div class="flex items-center gap-2 min-w-0">
				<Avatar size={32} status="online" fallback="ME" />
				<div class="flex flex-col min-w-0">
					<span class="text-sm font-bold text-dm-text-strong truncate leading-4">Mufaro</span>
					<span class="text-[11px] text-dm-text-muted truncate leading-3">#2026</span>
				</div>
			</div>
			<div class="flex items-center gap-1 shrink-0 text-dm-interactive-normal">
				<button aria-label="Mute Microphone" class="p-1 hover:bg-white/5 rounded cursor-pointer">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
					</svg>
				</button>
				<button aria-label="User Settings" class="p-1 hover:bg-white/5 rounded cursor-pointer">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Main Workspace Panel -->
	<div class="flex flex-col flex-1 min-w-0 bg-dm-bg-primary">
		<!-- Header Toolbar -->
		<div class="flex items-center justify-between px-4 h-12 border-b border-solid border-black/10 shrink-0">
			<div class="flex items-center gap-2">
				<span class="text-xl font-bold text-dm-text-muted">#</span>
				<Typography variant="h4" class="font-bold">general</Typography>
			</div>
			<!-- Tab bar -->
			<div class="h-full flex items-end">
				<Tabs bind:value={activeTab}>
					<TabsList class="border-b-0">
						<TabsTrigger value="chat">Chat Pane</TabsTrigger>
						<TabsTrigger value="components">UI Components Showcase</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>

		<!-- Workspace Contents -->
		<div class="flex-1 min-h-0 relative">
			{#if activeTab === 'chat'}
				<div class="flex flex-col h-full">
					<!-- Scrollable Chat list -->
					<ScrollArea variant="fade" class="flex-1">
						<div class="py-4 flex flex-col">
							<ChatMessageRow
								author="System Bot"
								timestamp="Today at 10:45 AM"
								authorColor="#5966f2"
							>
								Welcome to the new Svelte 5 library project! Let's explore some beautiful, strictly typed components.
							</ChatMessageRow>

							<ChatMessageRow
								author="Mana Designer"
								timestamp="Today at 10:47 AM"
								authorColor="#24a659"
							>
								Here is the interactive Rich Card Embed component representation:
								<div class="mt-2">
									<MessageEmbed
										provider="Mana Framework"
										author="Emily Kowalski"
										title="Design Principles & UI Polish"
										description="This is a fully reactive embed card rendering standard fallback fallbacks, caret SVG borders, and custom borders."
										accentColor="#5966f2"
									/>
								</div>
							</ChatMessageRow>

							<ChatMessageRow
								author="Mufaro"
								timestamp="Today at 10:50 AM"
								highlight="mentioned"
							>
								Wow, this cozy chat lane, mention vertical borders, and reaction pills feel highly responsive!
								<div class="flex flex-wrap gap-1.5 mt-2">
									<MessageReaction
										emoji="🔥"
										count={reaction1}
										reacted={reaction1Reacted}
										onclick={() => {
											reaction1Reacted = !reaction1Reacted;
											reaction1 += reaction1Reacted ? 1 : -1;
										}}
									/>
									<MessageReaction
										emoji="✨"
										count={reaction2}
										reacted={reaction2Reacted}
										onclick={() => {
											reaction2Reacted = !reaction2Reacted;
											reaction2 += reaction2Reacted ? 1 : -1;
										}}
									/>
								</div>
							</ChatMessageRow>

							<ChatMessageRow
								author="Nitro User"
								timestamp="Today at 10:52 AM"
								highlight="nitro"
								authorColor="#d93d45"
							>
								This row has a premium gradient background triggered strictly on hover. Hover me to see the effect!
							</ChatMessageRow>

							<ChatMessageRow
								author="Staff Moderator"
								timestamp="Today at 10:55 AM"
								highlight="ephemeral"
							>
								This is an ephemeral message. Only you can see this. (Has blurple vertical border accent).
							</ChatMessageRow>
						</div>
					</ScrollArea>

					<!-- Chat Input Bar -->
					<div class="p-4 shrink-0 bg-dm-bg-primary">
						<div class="relative flex items-center bg-dm-bg-input rounded-lg border border-solid border-dm-border-subtle focus-within:border-dm-brand transition-colors duration-150 pr-2">
							<Input
								placeholder="Message #general"
								bind:value={inputValue}
								class="bg-transparent border-0 focus-visible:ring-0"
							/>
							<Button variant="primary" size="small" class="shrink-0 h-8 font-semibold">Send</Button>
						</div>
					</div>
				</div>
			{:else}
				<!-- UI Showcase Tab -->
				<ScrollArea variant="thin" class="p-6">
					<div class="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
						<Typography variant="h1" class="border-b border-solid border-dm-border-subtle pb-2">Component Playground</Typography>

						<!-- Buttons Section -->
						<div class="flex flex-col gap-3">
							<Typography variant="h3">Buttons</Typography>
							<div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dm-bg-secondary rounded-lg border border-solid border-dm-border-subtle">
								<Button variant="primary" size="medium">Primary</Button>
								<Button variant="secondary" size="medium">Secondary</Button>
								<Button variant="danger" size="medium">Danger</Button>
								<Button variant="success" size="medium">Success</Button>
								<Button variant="outline" size="medium">Outline</Button>
								<Button variant="outline-primary" size="medium">Outline Brand</Button>
								<Button variant="outline-danger" size="medium">Outline Danger</Button>
								<Button variant="outline-success" size="medium">Outline Success</Button>
								<Button variant="link" size="medium">Link Button</Button>
								<Button variant="blank" size="medium">Blank Button</Button>
							</div>
						</div>

						<!-- Form Controls -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<!-- Inputs & Textarea -->
							<div class="flex flex-col gap-3">
								<Typography variant="h3">Text Fields</Typography>
								<div class="flex flex-col gap-4 p-4 bg-dm-bg-secondary rounded-lg border border-solid border-dm-border-subtle">
									<Input placeholder="Standard Input..." bind:value={inputValue} />
									<Input placeholder="Success Input..." state="success" />
									<Input placeholder="Error Input..." state="error" />
									<Textarea placeholder="Textarea message..." bind:value={textareaValue} />
								</div>
							</div>

							<!-- Checklist and Switches -->
							<div class="flex flex-col gap-3">
								<Typography variant="h3">Selection & Toggles</Typography>
								<div class="flex flex-col gap-4 p-4 bg-dm-bg-secondary rounded-lg border border-solid border-dm-border-subtle">
									<div class="flex items-center gap-6">
										<Checkbox bind:checked={checkboxInline}>Inline Checklist</Checkbox>
										<Switch bind:checked={switchChecked} />
									</div>
									<Checkbox variant="row" bind:checked={checkboxRow}>Row checkbox container (Highlighted on Selection)</Checkbox>
									
									<div class="flex items-center gap-4">
										<span class="text-sm font-semibold">Select theme:</span>
										<Select bind:value={selectValue} items={selectItems}>
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
										<span class="text-sm font-semibold">Segment control:</span>
										<SegmentedControl type="single" bind:value={segmentValue}>
											<SegmentedControlItem value="deny" action="deny">Deny</SegmentedControlItem>
											<SegmentedControlItem value="neutral">Neutral</SegmentedControlItem>
											<SegmentedControlItem value="allow" action="allow">Allow</SegmentedControlItem>
										</SegmentedControl>
									</div>
								</div>
							</div>
						</div>

						<!-- Modals / Overlays section -->
						<div class="flex flex-col gap-3">
							<Typography variant="h3">Modals & Overlays</Typography>
							<div class="p-4 bg-dm-bg-secondary rounded-lg border border-solid border-dm-border-subtle">
								<Button variant="primary" onclick={() => isDialogOpen = true}>Open Discord Modal</Button>

								<Dialog bind:open={isDialogOpen}>
									<DialogContent size="medium">
										<DialogHeader>
											<DialogTitle>System Alert</DialogTitle>
											<DialogDescription>Are you absolutely sure you want to proceed with this operation? All local caches will be purged.</DialogDescription>
										</DialogHeader>
										<div class="p-6">
											<p class="text-sm text-dm-text">Purging cache takes approximately 10 seconds. Proceed with caution.</p>
										</div>
										<DialogFooter>
											<Button variant="outline" onclick={() => isDialogOpen = false}>Cancel</Button>
											<Button variant="danger" onclick={() => isDialogOpen = false}>Confirm Purge</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</div>

						<!-- Typography Showcase -->
						<div class="flex flex-col gap-3">
							<Typography variant="h3">Typography Scale</Typography>
							<div class="flex flex-col gap-3 p-4 bg-dm-bg-secondary rounded-lg border border-solid border-dm-border-subtle">
								<Typography variant="h1">Header XXL (32px)</Typography>
								<Typography variant="h2">Header XL (24px)</Typography>
								<Typography variant="h3">Header LG (20px)</Typography>
								<Typography variant="h4">Header MD (16px)</Typography>
								<Typography variant="eyebrow">Eyebrow Label (12px uppercase)</Typography>
								<Typography variant="body-md">Body Medium text (16px)</Typography>
								<Typography variant="body-sm">Body Standard text (14px)</Typography>
								<Typography variant="body-xs">Body Muted / Small text (12px)</Typography>
								<div>
									<Typography variant="code">const manaUI = new SvelteComponent();</Typography>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			{/if}
		</div>
	</div>
</div>
