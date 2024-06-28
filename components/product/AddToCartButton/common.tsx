import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import Button from "../../ui/ButtonBanner.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  gotoCheckout?: boolean;
  disabled?: boolean;
}

const useAddToCart = ({ eventParams, onAddItem, gotoCheckout }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      gotoCheckout ? null : displayCart.value = true;
    } finally {
      setLoading(false);
      setTimeout(() => {
        gotoCheckout ? globalThis.window.location.href = "/checkout" : null;
      }, 500);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return props.gotoCheckout
    ? (
      <Button
        {...btnProps}
        class="w-full hover:bg-primary-700 hover:text-secondary-neutral-100 \
        disabled:bg-text-secondary-neutral-100 disabled:border disabled:border-bg-primary-700"
        negative
        disabled={props.disabled}
      >
        comprar
      </Button>
    )
    : (
      <Button
        {...btnProps}
        class="w-full hover:bg-primary-700"
        disabled={props.disabled}
      >
        Adicionar à Sacola
      </Button>
    );
}
