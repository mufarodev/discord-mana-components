import { Select as SelectPrimitive } from "bits-ui";
import Root from "./select.svelte";
import Group from "./select-group.svelte";
import Item from "./select-item.svelte";
import Content from "./select-content.svelte";
import Trigger from "./select-trigger.svelte";
import Portal from "./select-portal.svelte";

const Value = SelectPrimitive.Value;

export {
  Root,
  Group,
  Item,
  Content,
  Trigger,
  Portal,
  Value,
  // Aliases
  Root as Select,
  Group as SelectGroup,
  Item as SelectItem,
  Content as SelectContent,
  Trigger as SelectTrigger,
  Portal as SelectPortal,
  Value as SelectValue,
};
