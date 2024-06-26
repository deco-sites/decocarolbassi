import { SectionProps } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";
import SearchResult, {
  Props as SearchResultProps,
} from "../../components/search/SearchResult.tsx";

export type Props = SearchResultProps;

function WishlistGallery(props: SectionProps<typeof loader>) {
  const isEmpty = !props.page || props.page.products.length === 0;

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

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  return {
    ...props,
    url: req.url,
    device: ctx.device,
  };
};

export default WishlistGallery;
