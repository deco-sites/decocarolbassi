import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import QuantitySelector from "../../../components/ui/QuantitySelector.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { usePercentualDiscount } from "../../../sdk/usePercentualPrice.ts";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  skuName: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity, skuName } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const hasDiscount = (list ?? 0) > (sale ?? 0);
  const productPercentualOff = hasDiscount &&
    usePercentualDiscount(list!, sale!);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        src={image.src.replace("-55-55", "-255-255")}
        style={{ aspectRatio: "108 / 150" }}
        width={108}
        height={150}
        class="h-full object-cover"
      />

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-2">
            <span class="font-bold text-paragraph-color">{name}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          {hasDiscount && (
            <span class="line-through text-[#9AA4B2] text-xs">
              {formatPrice(list, currency, locale)}
            </span>
          )}
          <span>
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
          {hasDiscount && (
            <span class="text-[#9AA4B2] font-bold text-xs">
              {!!productPercentualOff && productPercentualOff}
            </span>
          )}
        </div>

        <div class="flex items-center justify-between">
          <span class="font-light text-dark-blue">Tamanho: {skuName}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <div class="flex items-center gap-2 font-light text-base">
              <IconTrash />
              Remover
            </div>
          </Button>
        </div>

        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
      </div>
    </div>
  );
}

export default CartItem;

const IconTrash = () => (
  <svg
    width={14}
    height={15}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.08975 14.0834C2.67549 14.0834 2.32085 13.9359 2.02585 13.6409C1.73084 13.3459 1.58333 12.9912 1.58333 12.577V2.00009H1.375C1.19792 2.00009 1.04948 1.94016 0.929688 1.82031C0.809896 1.70048 0.75 1.55198 0.75 1.37481C0.75 1.19766 0.809896 1.04926 0.929688 0.929606C1.04948 0.80994 1.19792 0.750106 1.375 0.750106H4.49998C4.49998 0.54605 4.57183 0.372176 4.71552 0.228481C4.85922 0.0847869 5.03309 0.0129395 5.23715 0.0129395H8.76281C8.96687 0.0129395 9.14074 0.0847869 9.28444 0.228481C9.42813 0.372176 9.49998 0.54605 9.49998 0.750106H12.625C12.802 0.750106 12.9505 0.81003 13.0703 0.929877C13.1901 1.04972 13.25 1.19822 13.25 1.37538C13.25 1.55254 13.1901 1.70095 13.0703 1.82061C12.9505 1.94026 12.802 2.00009 12.625 2.00009H12.4166V12.577C12.4166 12.9912 12.2691 13.3459 11.9741 13.6409C11.6791 13.9359 11.3245 14.0834 10.9102 14.0834H3.08975ZM11.1666 2.00009H2.83331V12.577C2.83331 12.6518 2.85735 12.7132 2.90544 12.7613C2.95352 12.8094 3.01496 12.8334 3.08975 12.8334H10.9102C10.985 12.8334 11.0464 12.8094 11.0945 12.7613C11.1426 12.7132 11.1666 12.6518 11.1666 12.577V2.00009ZM5.46181 11.1668C5.63897 11.1668 5.78737 11.1069 5.90702 10.9871C6.02669 10.8673 6.08652 10.7188 6.08652 10.5418V4.29173C6.08652 4.11466 6.0266 3.96623 5.90675 3.84644C5.7869 3.72665 5.6384 3.66675 5.46125 3.66675C5.28408 3.66675 5.13567 3.72665 5.01602 3.84644C4.89637 3.96623 4.83654 4.11466 4.83654 4.29173V10.5418C4.83654 10.7188 4.89647 10.8673 5.01631 10.9871C5.13615 11.1069 5.28465 11.1668 5.46181 11.1668ZM8.53871 11.1668C8.71588 11.1668 8.86429 11.1069 8.98394 10.9871C9.10359 10.8673 9.16342 10.7188 9.16342 10.5418V4.29173C9.16342 4.11466 9.10349 3.96623 8.98365 3.84644C8.86381 3.72665 8.71531 3.66675 8.53815 3.66675C8.36099 3.66675 8.21259 3.72665 8.09294 3.84644C7.97327 3.96623 7.91344 4.11466 7.91344 4.29173V10.5418C7.91344 10.7188 7.97336 10.8673 8.09321 10.9871C8.21306 11.1069 8.36156 11.1668 8.53871 11.1668Z"
      fill="#4B5565"
    />
  </svg>
);
