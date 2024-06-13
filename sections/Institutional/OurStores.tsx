import type { Secret } from "apps/website/loaders/secret.ts";
import { SectionProps } from "deco/types.ts";
import { AppContext } from "../../apps/site.ts";
import { StoreProps } from "../../components/ui/Map/Map.tsx";
import Map from "../../islands/Map/Map.tsx";
import MapMobile from "../../islands/Map/MapMobile.tsx";

export interface Props {
  apiKey: Secret;
  /** @title Cidades */
  stores: StoreProps[];
}

function OurStores({
  apiKey,
  stores,
  device,
}: SectionProps<typeof loader>) {
  return (
    <div class="w-full min-h-screen">
      {device !== "mobile"
        ? <Map apiKey={apiKey?.get() ?? ""} stores={stores} />
        : <MapMobile apiKey={apiKey?.get() ?? ""} stores={stores} />}
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default OurStores;
