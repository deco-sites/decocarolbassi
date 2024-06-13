import type { Secret } from "apps/website/loaders/secret.ts";
import { StoreProps } from "../../components/ui/Map.tsx";
import Map from "../../islands/Map.tsx";

export interface Props {
  apiKey: Secret;
  stores: StoreProps[];
}

export default function OurStores({
  apiKey,
  stores,
}: Props) {
  return (
    <div class="w-full">
      <Map apiKey={apiKey?.get() ?? ""} stores={stores} />
    </div>
  );
}
