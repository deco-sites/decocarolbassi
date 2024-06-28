import { useUser } from "apps/vtex/hooks/useUser.ts";
import { AppContext, SectionProps } from "deco/mod.ts";
import SearchResult, {
  Props as SearchResultProps,
} from "../../components/search/SearchResult.tsx";

export type Props = SearchResultProps;

export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext<any>,
) => {
  if (!props.page || !props.page.products || props.page.products.length === 0) {
    return {
      ...props,
      url: req.url,
      device: ctx.device,
    };
  }

  const products = await ctx.invoke.vtex.loaders.intelligentSearch.productList({
    ids: props.page?.products.map((product) => product.productID),
  });

  return {
    ...props,
    url: req.url,
    device: ctx.device,
    page: {
      ...props.page,
      products,
    },
  };
};

function WishlistGallery(props: SectionProps<typeof loader>) {
  const { user } = useUser();
  const isUserLoggedIn = Boolean(user.value?.email);
  const isEmpty = !props.page || props.page.products?.length === 0;

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

  if (isUserLoggedIn && isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Favoritos
          </span>
          <span>
            Nenhum produto encontrado.
          </span>
        </div>
      </div>
    );
  }

  return (
    <SearchResult
      {...props}
      categoryBanners={undefined}
      device={props.device}
    />
  );
}

export default WishlistGallery;
