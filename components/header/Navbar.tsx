import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { Buttons, Logo } from "../../components/header/Header.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  {
    items,
    searchbar,
    logo,
    buttons,
    logoPosition = "left",
    device,
    itemsPerColumn = 7,
  }: {
    items: SiteNavigationElement[];
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
    device: "mobile" | "desktop" | "tablet";
    itemsPerColumn?: number;
  },
) {
  const platform = usePlatform();

  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden grid grid-cols-2 justify-between items-center border-b border-solid border-[#e9e9e9] w-full px-6 pb-6 gap-2"
      >
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}

        <div class="flex justify-end gap-1 items-center">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
          <MenuButton />
        </div>
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden sm:flex sm:justify-between 2xl:grid 2xl:grid-cols-2 items-center border-b border-base-200 w-full px-6 xl:px-[3.5rem] 2xl:px-[5.5rem]  shadow-header">
      <div class="flex items-center gap-10">
        <ul
          class={`flex gap-6 col-span-1 ${
            logoPosition === "left" ? "justify-center" : "justify-start"
          }`}
        >
          {items.map((item) => (
            <NavItem item={item} itemsPerColumn={itemsPerColumn} />
          ))}
        </ul>
        <div
          class={`flex ${
            logoPosition === "left"
              ? "justify-start -order-1"
              : "justify-center"
          }`}
        >
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>
      </div>
      <div class="flex-none flex items-center justify-end gap-6 col-span-1">
        {!buttons?.hideSearchButton && (
          <div class="flex items-center text-xs font-thin gap-1 border-b border-black sm:max-h-[40px]">
            <SearchButton />
          </div>
        )}

        <Searchbar searchbar={searchbar} />
        <div class="flex items-center gap-3">
          {!buttons?.hideWishlistButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <button
                class="flex btn btn-circle btn-sm btn-ghost gap-1"
                aria-label="Wishlist"
              >
                <Icon id="Heart" size={25} strokeWidth={0.2} />
              </button>
            </a>
          )}

          {!buttons?.hideAccountButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/account"
              aria-label="Account"
            >
              <div class="flex btn btn-circle btn-sm btn-ghost gap-1">
                <UserIcon />
              </div>
            </a>
          )}

          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin">
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

const UserIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.8498 11.2C9.61647 11.2 9.4248 11.1167 9.2748 10.95C9.1248 10.7834 9.06647 10.5834 9.0998 10.35L9.3998 7.97505C9.48314 7.34172 9.7748 6.82088 10.2748 6.41255C10.7748 6.00422 11.3498 5.80005 11.9998 5.80005C12.6498 5.80005 13.2248 6.00422 13.7248 6.41255C14.2248 6.82088 14.5165 7.34172 14.5998 7.97505L14.8998 10.35C14.9331 10.5834 14.8748 10.7834 14.7248 10.95C14.5748 11.1167 14.3831 11.2 14.1498 11.2H9.8498ZM9.7748 10.5H14.2248L13.8998 8.10005C13.8331 7.63338 13.6206 7.25005 13.2623 6.95005C12.904 6.65005 12.4831 6.50005 11.9998 6.50005C11.5165 6.50005 11.0956 6.65005 10.7373 6.95005C10.379 7.25005 10.1665 7.63338 10.0998 8.10005L9.7748 10.5ZM5.2998 17.45V16.9C5.2998 16.5334 5.4123 16.1875 5.6373 15.8625C5.8623 15.5375 6.16647 15.2834 6.5498 15.1C7.46647 14.6667 8.37897 14.3417 9.2873 14.125C10.1956 13.9084 11.0998 13.8 11.9998 13.8C12.8998 13.8 13.804 13.9084 14.7123 14.125C15.6206 14.3417 16.5331 14.6667 17.4498 15.1C17.8331 15.2834 18.1373 15.5375 18.3623 15.8625C18.5873 16.1875 18.6998 16.5334 18.6998 16.9V17.45C18.6998 17.6667 18.629 17.8459 18.4873 17.9875C18.3456 18.1292 18.1665 18.2 17.9498 18.2H6.0498C5.83314 18.2 5.65397 18.1292 5.5123 17.9875C5.37064 17.8459 5.2998 17.6667 5.2998 17.45ZM5.9998 17.5H17.9998V16.9C17.9998 16.6667 17.9206 16.4459 17.7623 16.2375C17.604 16.0292 17.3831 15.85 17.0998 15.7C16.2998 15.3167 15.4706 15.0209 14.6123 14.8125C13.754 14.6042 12.8831 14.5 11.9998 14.5C11.1165 14.5 10.2456 14.6042 9.3873 14.8125C8.52897 15.0209 7.6998 15.3167 6.8998 15.7C6.61647 15.85 6.39564 16.0292 6.2373 16.2375C6.07897 16.4459 5.9998 16.6667 5.9998 16.9V17.5Z"
      fill="black"
    />
  </svg>
);
