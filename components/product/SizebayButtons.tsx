import { useState } from "preact/hooks";
import { lazy, Suspense } from "preact/compat";
import Icon from "../ui/Icon.tsx";
import SizebayIframe from "../ui/SizebayIframe.tsx";
import Loading from "../daisy/Loading.tsx";
import Modal from "../ui/Modal.tsx";

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

  return (
    <div id="sizebay-container">
      {showButtons !== null && (
        <div class="mt-6">
          {recommendedSize && (
            <div>
              <span class="bg-[#ffce00] p-1">
                Recomendamos o tamanho:{" "}
                <span class="font-bold">{recommendedSize}</span>
              </span>
            </div>
          )}
          <div class="flex justify-start gap-4">
            {showButtons === "noAccessory" && (
              <button class="flex py-4" onClick={toggleDisplayVfr}>
                <Icon class="mr-1" id="Ruler" height={20} width={25} />DESCUBRA
                SEU TAMANHO
              </button>
            )}
            <button class="flex py-4" onClick={toggleDisplayChart}>
              <Icon class="mr-1" id="Ruler" height={20} width={25} />GUIA DE
              MEDIDAS
            </button>
          </div>
        </div>
      )}
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
              fallback={<Loading size="loading-md" style={"loading-spinner"} />}
            >
              <SizebayIframe url={urlChart} />
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
              fallback={<Loading size="loading-md" style={"loading-spinner"} />}
            >
              <SizebayIframe url={urlVfr} />
            </Suspense>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default ProductSizebayButtons;
