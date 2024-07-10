import { Suspense } from "preact/compat";
import { useState } from "preact/hooks";
import Loading from "../daisy/Loading.tsx";
import Icon from "../ui/Icon.tsx";
import Modal from "../ui/Modal.tsx";
import SizebayIframe from "../ui/SizebayIframe.tsx";

export interface Props {
  showButtons: string | null;
  urlChart: string;
  urlVfr: string;
  recommendedSize: string | null;
}

function ProductSizebayButtons(
  { showButtons, urlChart, urlVfr, recommendedSize }: Props,
) {
  const [displayChartIframe, setDisplayChartIframe] = useState(false);
  const [displayVfrIframe, setDisplayVfrIframe] = useState(false);

  const toggleDisplayChart = () => {
    setDisplayChartIframe(!displayChartIframe);
  };

  const toggleDisplayVfr = () => {
    setDisplayVfrIframe(!displayVfrIframe);
  };

  return showButtons
    ? (
      <div id="sizebay-container">
        <div>
          {
            /* {recommendedSize && (
            <div>
              <span class="bg-dark-blue text-secondary-neutral-100 p-1">
                Recomendamos o tamanho:{" "}
                <span class="font-bold">{recommendedSize}</span>
              </span>
            </div>
          )} */
          }
          <div class="flex justify-between">
            {showButtons === "noAccessory" && (
              <button
                class="flex text-base text-paragraph-color font-light"
                onClick={toggleDisplayVfr}
              >
                Provador virtual
              </button>
            )}
            <button
              class="flex text-base text-paragraph-color font-light"
              onClick={toggleDisplayChart}
            >
              Guia de tamanhos
            </button>
          </div>
        </div>
        {displayChartIframe && (
          <div>
            <Modal
              loading="lazy"
              open={displayChartIframe}
              onClose={() => {
                setDisplayChartIframe(false);
              }}
            >
              <Suspense
                fallback={
                  <Loading size="loading-md" style={"loading-spinner"} />
                }
              >
                <SizebayIframe url={urlChart}>
                  <button
                    aria-label={"Fechar modal Sizebay"}
                    class="h-[48px] w-[48px] flex items-center justify-center absolute top-0 sm:top-10 right-0 bg-secondary-neutral-100"
                    onClick={() => setDisplayChartIframe(false)}
                  >
                    <Icon id="XMark" size={24} strokeWidth={1} />
                  </button>
                </SizebayIframe>
              </Suspense>
            </Modal>
          </div>
        )}
        {displayVfrIframe && (
          <div>
            <Modal
              loading="lazy"
              open={displayVfrIframe}
              class={`max-w-[1000px] bg-transparent shadow-none`}
              onClose={() => {
                setDisplayVfrIframe(false);
              }}
            >
              <Suspense
                fallback={
                  <Loading size="loading-md" style={"loading-spinner"} />
                }
              >
                <SizebayIframe url={urlVfr}>
                  <button
                    aria-label={"Fechar modal Sizebay"}
                    class="h-[48px] w-[48px] flex items-center justify-center absolute top-0 sm:top-10 right-0 bg-secondary-neutral-100"
                    onClick={() => setDisplayVfrIframe(false)}
                  >
                    <Icon id="XMark" size={24} strokeWidth={1} />
                  </button>
                </SizebayIframe>
              </Suspense>
            </Modal>
          </div>
        )}
      </div>
    )
    : null;
}

export default ProductSizebayButtons;
