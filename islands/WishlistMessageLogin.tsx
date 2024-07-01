import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function WishlistMessageLogin() {
  const { user } = useUser();
  const isUserLoggedIn = Boolean(user.value?.email);

  console.log("isUserLoggedIn", isUserLoggedIn);

  if (!isUserLoggedIn) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Favoritos
          </span>
          <p>
            teste
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
          <a href="/user-myaccount" class="underline">Faça seu login</a>{" "}
          <span>
            para visualização a lista de produtos de sua wishlist.
          </span>
        </p>
      </div>
    </div>
  );
}
