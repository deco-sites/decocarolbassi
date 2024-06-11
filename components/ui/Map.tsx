import { useSignal } from "@preact/signals";
import { useEffect } from "preact/compat";

export interface Props {
  apiKey: string;
}

import { Loader } from "https://esm.sh/@googlemaps/js-api-loader@1.16.6";

export default function Map({
  apiKey,
}: Props) {
  let map;
  const current = useSignal("");
  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
    });
    loader
      .importLibrary("maps")
      .then(({ Map }: any) => {
        map = new Map(document.getElementById("map")!, {
          center: { lat: -23.5207, lng: -46.4187 },
          zoom: 12,
        });
      })
      .catch((e: Error) => {
        console.error(e);
      });
  }, []);
  console.log(current.value);
  return (
    <div>
      <div id="map" class="w-full h-96"></div>
      <div>{current}</div>
    </div>
  );
}
