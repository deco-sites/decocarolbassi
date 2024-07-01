import { AppContext, SectionProps } from "deco/mod.ts";
import SearchResult, {
  Props as SearchResultProps,
} from "../../components/search/SearchResult.tsx";

import WishlistMessageLogin from "../../islands/WishlistMessageLogin.tsx";

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

  return !isEmpty
    ? (
      <SearchResult
        {...props}
        categoryBanners={undefined}
        device={props.device}
      />
    )
    : <WishlistMessageLogin />;
}

export default WishlistGallery;
