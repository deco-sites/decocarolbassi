import { useSignal } from "@preact/signals";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues(
  { key, values }: FilterToggle,
  { isOpen }: { isOpen: boolean },
) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function FilterItem(item: FilterToggle) {
  const isOpen = useSignal<boolean>(false);

  const handleClick = () => isOpen.value = !isOpen.value;

  return (
    <li class="flex flex-col gap-4">
      <button onClick={handleClick} class="flex" aria-label="open filter item">
        <span class="flex items-center">
          {item.label} {!isOpen.value
            ? <Icon id="ArrowDown" size={26} />
            : <Icon id="ArrowDown" size={26} class={"rotate-180"} />}
        </span>
      </button>
      <div class={`${!isOpen.value ? "hidden" : ""}`}>
        <FilterValues {...item} />
      </div>
    </li>
  );
}

function Filters({ filters }: Props) {
  console.log({ filters });

  return (
    <ul class="flex flex-col gap-6 p-4">
      {filters
        .filter(isToggle)
        .map((filter) => <FilterItem {...filter} />)}
    </ul>
  );
}

export default Filters;
