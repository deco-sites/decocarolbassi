import Map from "../../islands/Map.tsx";
import type { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  apiKey: Secret;
}

export default function OurStores({
  apiKey,
}: Props) {
  return (
    <div class="w-full container px-4 py-8 flex flex-col gap-14 lg:gap-20 lg:py-10 lg:px-0">
      <Map apiKey={apiKey?.get() ?? ""} />
    </div>
  );
}
