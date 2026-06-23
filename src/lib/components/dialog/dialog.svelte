<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const DIALOG_OPEN_KEY = Symbol('dialog-open');

	export function getDialogOpenContext() {
		return getContext<{ open: boolean }>(DIALOG_OPEN_KEY);
	}
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';

	let { open = $bindable(false), ...restProps }: DialogPrimitive.RootProps = $props();

	setContext(DIALOG_OPEN_KEY, {
		get open() {
			return open;
		}
	});
</script>

<DialogPrimitive.Root bind:open {...restProps} />
