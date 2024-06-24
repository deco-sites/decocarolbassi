import { useSignal } from "@preact/signals";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useRef } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import Button from "../ui/ButtonBanner.tsx";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const buttonContent = useSignal("AVISE-ME");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    buttonContent.value = "Enviando...";
    try {
      loading.value = true;

      const name = nameRef?.current?.value ?? "";
      const email = emailRef?.current?.value ?? "";

      await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
      buttonContent.value = "Enviado com Sucesso";
    } finally {
      loading.value = false;
      setTimeout(() => {
        buttonContent.value = "AVISE-ME";
        if (nameRef.current && emailRef.current) {
          emailRef.current.value = "";
          nameRef.current.value = "";
        }
      }, 3000);
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <h4 class="text-xl text-dark-blue">Avise-me</h4>
      <span class="text-base text-paragraph-color font-light mb-4">
        Digite seu e-mail no campo abaixo e te avisaremos quando esse produto
        estiver disponível no estoque.
      </span>

      <input
        ref={nameRef}
        placeholder="Seu nome"
        class="border-b text-sm border-[#9AA4B2] focus:outline-none p-2"
        name="name"
      />

      <input
        ref={emailRef}
        placeholder="Seu e-mail"
        class="border-b text-sm border-[#9AA4B2] focus:outline-none p-2"
        name="email"
      />

      <Button
        negative={buttonContent.value === "AVISE-ME"}
        class={`btn w-full mt-6  ${
          buttonContent.value === "AVISE-ME"
            ? "text-secondary-neutral-100 hover:border-primary-700"
            : ""
        } `}
        disabled={loading}
        type="submit"
      >
        {buttonContent.value}
      </Button>
    </form>
  );
}

export default Notify;
