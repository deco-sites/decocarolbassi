import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";

const FirstBuyModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const email = useSignal("");

  const closeModal = () => {
    setIsVisible(false);
    localStorage.setItem("modalShown", "true");
  };

  const handleOutsideClick = (event: any) => {
    if (event.target.id === "modal-background") {
      closeModal();
    }
  };

  useEffect(() => {
    const isModalShown = localStorage.getItem("modalShown");
    if (!isModalShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    console.log({ email });
  }, [email]);

  return (
    isVisible && (
      <div
        id="modal-background"
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] "
        onClick={handleOutsideClick}
      >
        <div className="bg-[#fff] w-[918px] relative flex justify-between items-center border-solid border-[1px] max-[1024px]:w-[530px] max-[600px]:w-[90vw] max-[400px]:flex-col max-[400px]:gap-4">
          <img
            src="https://deco-sites-assets.s3.sa-east-1.amazonaws.com/decocarolbassi/759c4ffa-e292-4bf4-abd7-f5f34933294a/firstBuyModalImage.png"
            alt="Banner"
            className="max-[1024px]:w-[330px] max-[600px]:w-[200px] max-[400px]:w-full"
          />
          <div className="flex flex-col items-center px-10 max-[1024px]:px-4">
            <h2 className="text-5xl mb-[29px] max-[1024px]:text-[20px] max-[600px]:mb-2">
              GARANTA 10% OFF
            </h2>
            <p className="text-center mb-6 max-[1024px]:text-[9px] max-[600px]:mb-2">
              Quer estar sempre por dentro das últimas tendências? Assine nossa
              newsletter e receba 10% de desconto na sua próxima compra usando o
              voucher <strong>CAROLBASSI10</strong>
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                email.value = target.value;
              }}
              placeholder="E-mail"
              className="border border-[#000] px-6 w-full rounded-[19px] mb-2 h-[55px] placeholder:text-xs max-[1024px]:h-[37px]"
            />
            <p className="text-sm text-[#000] self-start max-[1024px]:text-[6px]">
              *Desconto válido apenas em produtos full price
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default FirstBuyModal;
