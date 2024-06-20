import { useSignal } from "@preact/signals";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { invoke } from "../../runtime.ts";
import Button from "../ui/ButtonBanner.tsx";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const buttonContent = useSignal("AVISA-ME");

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    buttonContent.value = "Enviando...";
    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
      buttonContent.value = "Enviado com Sucesso";
    } finally {
      loading.value = false;
      setTimeout(() => {
        buttonContent.value = "AVISE-ME";
      }, 1000);
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
        placeholder="Seu nome"
        class="border-b text-sm border-[#9AA4B2] focus:outline-none p-2"
        name="name"
      />

      <input
        placeholder="Seu e-mail"
        class="border-b text-sm border-[#9AA4B2] focus:outline-none p-2"
        name="email"
      />

      <Button
        negative
        class="btn text-secondary-neutral-100 w-full mt-6 hover:border-primary-700"
        disabled={loading}
        type="submit"
      >
        {buttonContent.value}
      </Button>
    </form>
  );
}

export default Notify;
