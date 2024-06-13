import { useSignal } from "@preact/signals";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { Loader } from "https://esm.sh/@googlemaps/js-api-loader@1.16.6";
import { useEffect } from "preact/compat";
import { useUI } from "../../../sdk/useUI.ts";
import Icon from "../Icon.tsx";

/** @title {{{storeTitle}}} */
export interface StoreInfo {
  storeTitle?: string;
  info: HTMLWidget;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

/** @title {{{city}}} */
export interface StoreProps {
  city: string;
  /** @title Store */
  storeInfo: StoreInfo[];
}

/** @title Lojas */
export interface Props {
  apiKey: string;
  stores: StoreProps[];
}

function Store({ index, store }: { store: StoreProps; index: number }) {
  const { storeLocal } = useUI();

  const isOpen = useSignal<boolean>(false);

  const storeMap: Record<string, StoreInfo & { city: string }> = {};

  store.storeInfo.forEach((info, infoIndex) => {
    storeMap[infoIndex] = {
      ...info,
      city: store.city,
    };
  });

  const storeNewValues = Object.values(storeMap);

  return (
    <div class="min-w-max w-full flex gap-8">
      {storeNewValues
        ? storeNewValues.map((store, storeIndex) => {
          const shortDescription = `${store.info.substring(0, 105)}...`;

          return (
            <div class="my-4" key={storeIndex}>
              <h3 class="uppercase font-light text-dark-blue">
                {store.city}
              </h3>
              <div class="">
                <div
                  class={`my-8 fade-in ${
                    isOpen ? "animate-fade-in" : "opacity-0"
                  }`}
                >
                  <div class="text-[#4B5565] font-light text-sm">
                    {isOpen.value
                      ? <p dangerouslySetInnerHTML={{ __html: store.info }} />
                      : (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: shortDescription,
                          }}
                        />
                      )}
                  </div>

                  <button
                    class="my-4 flex gap-2 items-center justify-center w-full"
                    onClick={() => isOpen.value = !isOpen.value}
                  >
                    <h3 class="font-light text-[#4B5565] text-base text-center">
                      Mais Informações
                    </h3>
                    {isOpen.value
                      ? <Icon id="ArrowDown" class="rotate-180" size={24} />
                      : <Icon id="ArrowDown" size={24} />}
                  </button>

                  <button
                    class="uppercase btn hover:bg-primary-600 hover:text-secondary-neutral-100 mt-6 mb- flex justify-center items-center border border-solid border-primary-600 w-full gap-2 p-2 text-base font-normal"
                    onClick={() => {
                      storeLocal.value = {
                        lat: store.coordinates.latitude,
                        lng: store.coordinates.longitude,
                      };

                      isOpen.value = false;
                    }}
                  >
                    <LocatorIcon />
                    Ver No mapa
                  </button>
                </div>
              </div>
            </div>
          );
        })
        : null}
    </div>
  );
}

function Stores({ stores }: { stores: StoreProps[] }) {
  return (
    <div class="absolute lg:top-[15%] bg-secondary-neutral-100 lg:py-8 px-4 lg:left-8 lg:min-w-[525px] bottom-0 w-full flex gap-8 overflow-y-scroll">
      {stores.map((store, index) => (
        <Store key={index} index={index} store={store} />
      ))}
    </div>
  );
}

export default function Map({ apiKey, stores }: Props) {
  let map: any;

  const { storeLocal } = useUI();

  useEffect(() => {
    async function initMap(): Promise<void> {
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
      });

      const { Map } = await loader
        .importLibrary("maps") as google.maps.MapsLibrary;

      const { AdvancedMarkerElement } = await loader
        .importLibrary("marker") as google.maps.MarkerLibrary;

      map = new Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 18,
          center: storeLocal.value,
          mapId: "a29e78828d16a498",
        },
      );

      new AdvancedMarkerElement({
        map: map,
        position: storeLocal.value,
      });
    }

    initMap();
  }, [storeLocal.value]);

  const DEFAULT_STORES: StoreProps[] = [
    {
      city: "São Paulo",
      storeInfo: [
        {
          info: "teste",
          coordinates: {
            latitude: -23.5207,
            longitude: -46.4187,
          },
        },
        {
          info: "test2",
          coordinates: {
            latitude: -23.5207,
            longitude: -46.4187,
          },
        },
      ],
    },
    {
      city: "Paraná",
      storeInfo: [
        {
          info: "teste",
          coordinates: {
            latitude: -23.5207,
            longitude: -46.4187,
          },
        },
      ],
    },
  ];

  const storesData = stores ?? DEFAULT_STORES;

  return (
    <div class="relative">
      <h2 class="text-dark-blue uppercase m-8 text-xl text-center">
        Nossas Lojas
      </h2>
      <div id="map" class="w-full h-[100svh]"></div>
      <Stores stores={storesData} />
    </div>
  );
}

const LocatorIcon = () => (
  <svg
    width={12}
    height={16}
    viewBox="0 0 12 16"
    fill="currentColor"
    stroke-width={"currentColor"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.99948 14.3975C7.56573 13.0342 8.80399 11.6476 9.71427 10.2379C10.6245 8.82819 11.0797 7.60896 11.0797 6.58021C11.0797 5.05562 10.597 3.79729 9.63177 2.80521C8.66649 1.81326 7.45573 1.31729 5.99948 1.31729C4.54323 1.31729 3.33247 1.81326 2.36719 2.80521C1.40191 3.79729 0.919271 5.05562 0.919271 6.58021C0.919271 7.60896 1.37441 8.82819 2.28469 10.2379C3.19497 11.6476 4.43323 13.0342 5.99948 14.3975ZM5.99948 15.1298C5.8692 15.1298 5.73885 15.1084 5.60844 15.0656C5.47816 15.023 5.35795 14.9535 5.24781 14.8573C4.6549 14.3124 4.05392 13.7056 3.4449 13.0369C2.83601 12.3681 2.28288 11.6756 1.78552 10.9592C1.28816 10.2428 0.88059 9.51146 0.562813 8.76521C0.244896 8.01896 0.0859375 7.29062 0.0859375 6.58021C0.0859375 4.81729 0.659965 3.36319 1.80802 2.21792C2.95594 1.07264 4.35309 0.5 5.99948 0.5C7.64587 0.5 9.04302 1.07264 10.1909 2.21792C11.339 3.36319 11.913 4.81729 11.913 6.58021C11.913 7.29062 11.7541 8.01632 11.4361 8.75729C11.1184 9.49813 10.7134 10.2294 10.2214 10.951C9.72941 11.6728 9.17892 12.3654 8.5699 13.0287C7.96101 13.6922 7.3601 14.2964 6.76719 14.8413C6.66094 14.9375 6.54024 15.0097 6.4051 15.0577C6.26983 15.1058 6.13462 15.1298 5.99948 15.1298ZM6.0024 7.77562C6.37337 7.77562 6.68997 7.64354 6.95219 7.37937C7.21455 7.11521 7.34573 6.79764 7.34573 6.42667C7.34573 6.05569 7.21358 5.73903 6.94927 5.47667C6.6851 5.21444 6.36753 5.08333 5.99656 5.08333C5.62559 5.08333 5.30899 5.21542 5.04677 5.47958C4.78441 5.74375 4.65323 6.06132 4.65323 6.43229C4.65323 6.80326 4.78538 7.11993 5.04969 7.38229C5.31385 7.64451 5.63142 7.77562 6.0024 7.77562Z"
      fill="currentColor"
    />
  </svg>
);
