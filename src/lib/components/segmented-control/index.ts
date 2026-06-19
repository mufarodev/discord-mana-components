import Root, { type SegmentedControlProps } from './segmented-control.svelte';
import Item, { type SegmentedControlItemProps, segmentedControlItemVariants } from './segmented-control-item.svelte';

export {
	Root,
	Item,
	// Aliases
	Root as SegmentedControl,
	Item as SegmentedControlItem,
	segmentedControlItemVariants,
	type SegmentedControlProps,
	type SegmentedControlItemProps
};
