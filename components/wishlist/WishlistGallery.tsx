import { SectionProps } from "deco/mod.ts";
import SearchResult, {
  Props as SearchResultProps,
} from "../../components/search/SearchResult.tsx";
import { AppContext } from "deco/mod.ts";

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
  const isEmpty = !props.page || props.page.products?.length === 0;

  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">Your wishlist is empty</span>
          <span>
            Log in and add items to your wishlist for later. They will show up
            here
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
