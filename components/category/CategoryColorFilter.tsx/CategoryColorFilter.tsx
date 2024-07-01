import { FilterToggleValue } from "apps/commerce/types.ts";
import ColorAvatarFilter from "../../ui/ColorAvatarFilter.tsx";

function ValueItem(
  { url, selected, label, quantity, value }: FilterToggleValue,
) {
  const capitalizeValue = value[0].toUpperCase() + value.slice(1);

  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox border-primary-700 rounded-none h-4 w-4"
      />
      <ColorAvatarFilter
        content={capitalizeValue}
        variant={selected ? "active" : "default"}
      />
      <span class="text-sm font-light text-paragraph-color capitalize">
        {label}
      </span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

export default function CategoryColorFilter(item: FilterToggleValue) {
  return <ValueItem {...item} />;
}
