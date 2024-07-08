import { AppContext } from "apps/vtex/mod.ts";

export interface Props {
  productId: string ;
}

export default async function ProductRecommendationsLoader(props: Props, _req: Request, ctx: AppContext) {
  const productId = props.productId;
  
  if (!productId) {
    console.error("Product ID is missing.");
    return null;
  }
  
  try {
      const { io } = await ctx.invoke.vtex.loaders.config();
      const response = io.query<
        {
          productRecommendations: {
            productName: string;
            linkText: string;
            items: {
              images: { imageUrl: string }[];
              sellers: { commertialOffer: { Price: number } }[];
            }[];
          };
        },
        { productId: string }
      >({
        operationName: "productRecommendations",
        variables: {
          productId,
        },
        query: `
          query productRecommendations($productId: ID!) {
            productRecommendations(
              identifier: { field: id, value: $productId }, 
              type: accessories
            ) @context(provider: "vtex.search-graphql") {
              productName
              linkText
              items(filter: FIRST_AVAILABLE) {
                images(quantity: 2) {
                  imageUrl
                }
                sellers {
                  commertialOffer {
                    Price
                  }
                }
              }
            }
          }
        `,
      });
      return response;
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      return null;
    }
}