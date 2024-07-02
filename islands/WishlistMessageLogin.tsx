import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function WishlistMessageLogin() {
  const { user } = useUser();
  const isUserLoggedIn = Boolean(user.value?.email);

  if (!isUserLoggedIn) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Favoritos
          </span>
          <p>
            <a href="/user-myaccount" class="underline">Faça seu login</a>{" "}
            <span>
              para visualização a lista de produtos de sua wishlist.
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div class="container mx-4 sm:mx-auto">
      <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
        <span class="font-medium text-2xl">
          Favoritos
        </span>
        <p>
          Não há itens salvos em suas wishlist. Que tal começar a sua lista
          vendo{"  "}
          <a href="/new-in" class="underline">
            nossas novidades?
          </a>
        </p>
      </div>
    </div>
  );
}
