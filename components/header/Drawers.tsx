import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useUI } from "../../sdk/useUI.ts";

const Menu = lazy(() => import("../../components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../../components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw] overflow-scroll z-50 bg-secondary-neutral-100">
    <div class="flex justify-between items-center">
      <h1 class="px-4 py-3">
        <span class="font-light text-2xl">{title}</span>
      </h1>
      {onClose && (
        <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={1} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      <Drawer // left drawer
        class="drawer-end"
        open={displayMenu.value || displaySearchDrawer.value}
        onClose={() => {
          displayMenu.value = false;
          displaySearchDrawer.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
              displaySearchDrawer.value = false;
            }}
            title={displayMenu.value ? "CAROL BASSI" : ""}
          >
            {displayMenu.value && <Menu {...menu} />}
            {searchbar && displaySearchDrawer.value && (
              <div
                class="w-screen"
                style={!displayMenu.value ? { border: "0" } : {}}
              >
                <Searchbar {...searchbar} />
              </div>
            )}
          </Aside>
        }
      >
        {children}
      </Drawer>
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title="CAROL BASSI"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
