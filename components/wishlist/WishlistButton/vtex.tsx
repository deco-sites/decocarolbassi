import { useComputed } from "@preact/signals";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";
import Button from "./common.tsx";

export interface Props {
  productID: string;
  productGroupID?: string;
  productUrl?: string;
  variant?: "icon" | "full";
  class?: string;
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
  productUrl,
  class: _class,
}: Props) {
  const { user } = useUser();
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() =>
    getItem({ sku: productID, productId: productGroupID })
  );

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      class={_class}
      loading={loading.value}
      inWishlist={inWishlist}
      isUserLoggedIn={isUserLoggedIn}
      variant={variant}
      productGroupID={productGroupID}
      productID={productID}
      productUrl={productUrl}
      removeItem={() => removeItem({ id: listItem.value!.id }!)}
      addItem={() =>
        addItem({ sku: productID, productId: productGroupID || productID })}
    />
  );
}

export default WishlistButton;
