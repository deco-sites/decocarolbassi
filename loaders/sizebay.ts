import { ProductDetailsPage } from "apps/commerce/types.ts";
import { getCookies, setCookie } from "std/http/mod.ts";
import { AppContext } from "../apps/site.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default async function SizebayLoader({ page }: Props, req: Request, ctx: AppContext) {
  const cookies = getCookies(req.headers);
  let SID: string | null = cookies.SIZEBAY_SESSION_ID_V4;
  let showButtons: string | null = null;
  let buttonsUrl: (mode: string) => string = (_a: string) => "a";
  let permaLink = "";
  let recommendedSize: string | null = null;

  if (page?.product.url?.includes("https://0.0.0.0:10503/")) {
    // to work in local
    permaLink = page?.product.url?.replace(
      "https://0.0.0.0:10503",
      "https://www.carolbassi.com.br",
    ).split("?")[0];
  } else if (
    page?.product.url?.includes("https://decocarolbassi.deco.site/")
  ) {
    permaLink = page?.product.url?.replace(
      "https://decocarolbassi.deco.site",
      "https://www.carolbassi.com.br",
    ).split("?")[0];
  } else {
    permaLink = page?.product.url!;
  }

  try {
    if (!SID) {
      const response = await fetch(
        `https://vfr-v3-production.sizebay.technology/api/me/session-id`,
      ).then((r) => r.json())
        .catch((e) => {
          console.error(e);
        });

      SID = response as string ?? null;

      setCookie(ctx.response.headers, {
        value: SID,
        name: "SIZEBAY_SESSION_ID_V4",
        path: "/",
        secure: true,
        httpOnly: true,
      });
    }

    const sizebayProductURL =
      `https://vfr-v3-production.sizebay.technology/plugin/my-product-id?sid=${SID}&permalink=${permaLink}`;

    const sizebayProduct: any = await fetch(
      sizebayProductURL,
    ).then((r) => r.json())
      .catch((e) => {
        console.error(e);
      });

    if (sizebayProduct && typeof sizebayProduct !== "string") {
      showButtons = sizebayProduct.accessory ? "accessory" : "noAccessory";

      const response: any = await fetch(
        `https://vfr-v3-production.sizebay.technology/api/me/analysis/${sizebayProduct.id}?sid=${SID}&tenant=664`,
      ).then((r) => r.json())
        .catch((e) => {
          console.error(e);
        });

      if (response.recommendedSize) {
        recommendedSize = response.recommendedSize;
      }
    }

    buttonsUrl = (mode: string) =>
      `https://vfr-v3-production.sizebay.technology/V4/?mode=${mode}&id=${sizebayProduct.id}&sid=${SID}&tenantId=664&watchOpeningEvents=true&lang=pt`;
  } catch (e) {
    console.error(e);
  }

  return {
    showButtons,
    buttonsUrl,
    recommendedSize,
  }
}