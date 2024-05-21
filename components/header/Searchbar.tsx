import Searchbar, {
  Props as SearchbarProps,
} from "../../components/search/Searchbar.tsx";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return displaySearchPopup.value ? (
    <div
      class="absolute top-0 bg-base-100 z-50 w-screen right-0"
    >
      <Searchbar {...searchbar} />
    </div>
  ) : null;
}

export default SearchbarModal;
