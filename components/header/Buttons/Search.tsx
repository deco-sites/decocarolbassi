import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();
  // bg-transparent hidden sm:flex shadow-none border-0 hover:bg-transparent px-4 drop-shadow-none	shadow-none
  return (
    <>
      <button
        class="bg-transparent hidden sm:flex border-0 hover:bg-transparent px-4 h-12 items-center text-sm"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <span class="font-light text-paragraph-color mr-8">
          O que você procura?
        </span>
        <Icon id="MagnifyingGlass" size={17} strokeWidth={0.1} />
      </button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden mt-[5px]"
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
      </Button>
    </>
  );
}
