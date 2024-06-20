import { useSignal } from "@preact/signals";
import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import Modal from "../../ui/Modal.tsx";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  loading: boolean;
  inWishlist: boolean;
  isUserLoggedIn: boolean;
  class?: string;
}

function ButtonCommon({
  variant = "icon",
  productGroupID,
  productID,
  loading,
  inWishlist,
  isUserLoggedIn,
  removeItem,
  addItem,
  class: _class,
}: Props) {
  const fetching = useSignal(false);
  const isOpen = useSignal(false);

  return (
    <>
      <Modal
        open={isOpen.value}
        class="flex items-center justify-center rounded-md"
        onClose={() => isOpen.value = false}
      >
        <div className=" w-full h-full">
          <div class="bg-secondary-neutral-100 p-8 max-w-max m-auto relative">
            <button
              className="absolute btn-square top-[10px] right-0"
              onClick={() => {
                isOpen.value = false;
              }}
            >
              <Icon id="XMark" size={24} strokeWidth={1} />
            </button>
            <h1 className="m-8">
              Para adicionar o item a sua wishlist,{" "}
              <a href="/login">
                <span class="underline">faça seu login.</span>
              </a>
            </h1>
          </div>
        </div>
      </Modal>

      <Button
        class={variant === "icon"
          ? `btn-circle btn-ghost gap-2 ${_class}`
          : `btn-primary btn-outline gap-2 ${_class}`}
        loading={fetching.value}
        aria-label="Add to wishlist"
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          isOpen.value = true;

          if (!isUserLoggedIn) {
            return;
          }

          if (loading) {
            return;
          }

          try {
            fetching.value = true;

            if (inWishlist) {
              await removeItem();
            } else if (productID && productGroupID) {
              await addItem();

              sendEvent({
                name: "add_to_wishlist",
                params: {
                  items: [
                    {
                      item_id: productID,
                      item_group_id: productGroupID,
                      quantity: 1,
                    },
                  ],
                },
              });
            }
          } finally {
            fetching.value = false;
          }
        }}
      >
        <Icon
          id="Heart"
          size={24}
          strokeWidth={.4}
          fill={inWishlist ? "black" : "none"}
        />
        {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
      </Button>
    </>
  );
}

export default ButtonCommon;
