import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="bg-transparent hidden sm:flex shadow-none border-0 hover:bg-transparent px-4"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <span class="font-light text-paragraph-color mr-8">Procurando por algo?</span>
        <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden"
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
