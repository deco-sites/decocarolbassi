import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

const FirstBuyModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const email = useSignal("");

  const isRegistred = localStorage.getItem("registred");

  const closeModal = () => {
    setIsVisible(false);
    sessionStorage.setItem("modalShown", "true");
  };

  const handleOutsideClick = (event: any) => {
    if (event.target.id === "modal-background") {
      closeModal();
    }
  };

  useEffect(() => {
    const isModalShown = sessionStorage.getItem("modalShown");

    if (!isModalShown && !isRegistred) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;

    if (!email.length) {
      alert("Preencha um e-mail válido!");
      return;
    }

    await invoke.vtex.actions.masterdata.createDocument({
      data: { email },
      acronym: "NL",
    });
    alert("E-mail cadastrado com sucesso!");

    localStorage.setItem("registred", "true");

    closeModal();
  };

  return (
    isVisible &&
    !isRegistred && (
      <div
        id="modal-background"
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] "
        onClick={handleOutsideClick}
      >
        <div className="bg-[#fff] w-[918px] relative flex justify-between items-center border-solid border-[1px] max-[1024px]:w-[70%] max-[1024px]:min-w-[530px] max-[600px]:w-[90vw] max-[600px]:min-w-[unset] max-[460px]:flex-col max-[400px]:gap-4">
          <img
            src="https://deco-sites-assets.s3.sa-east-1.amazonaws.com/decocarolbassi/087978e2-9606-47d1-a280-8a68f936ad30/banner_first_buy_modal.png"
            alt="Banner"
            className="max-[1024px]:w-[330px] max-[600px]:w-[200px] max-[460px]:w-full"
          />
          <div className="flex flex-col items-center px-10 max-[1024px]:px-4 max-[460px]:py-[15px]">
            <h2 className="font-[Montserrat] text-[37px] mb-[29px] max-[1024px]:text-[20px] max-[600px]:mb-2">
              GARANTA 10% OFF
            </h2>
            <p className="font-[Montserrat] text-[18px] text-center mb-6 max-[1024px]:text-[9px] max-[600px]:mb-2">
              Quer estar sempre por dentro das nossas novidades? <br></br>Assine
              nossa newsletter e receba 10% de desconto na sua próxima compra
              usando o voucher: <strong>CAROLBASSI10</strong>
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  email.value = target.value;
                }}
                placeholder="E-mail"
                className="border border-[#000] px-6 w-full rounded-[19px] mb-2 h-[55px] placeholder:text-xs max-[1024px]:h-[37px]"
              />
              <p className="font-[Montserrat] text-sm text-[#000] self-start max-[1024px]:text-[6px] w-full text-center">
                *Desconto válido apenas em produtos full price
              </p>
              <button
                type="submit"
                className="bg-primary-900 text-[#fff] mt-3 mb-[18px] rounded-[19px] h-[33px] w-[125px] text-[12px] max-[1024px]:text-[10px] max-[1024px]:w-[109px] max-[1024px]:h-[27px] max-[1024px]:mb-[15px] max-[600px]:mb-[0]"
              >
                INSCREVA-SE
              </button>
            </form>
          </div>
          <span
            className="absolute top-[5px] right-[5px] text-[20px]  cursor-pointer w-[30px] h-[30px] text-center"
            onClick={() => {
              closeModal();
            }}
          >
            X
          </span>
        </div>
      </div>
    )
  );
};

export default FirstBuyModal;

