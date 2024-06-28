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
              href="/user-myaccount"
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
      d="M9.85005 11.2C9.61672 11.2 9.42505 11.1167 9.27505 10.95C9.12505 10.7834 9.06672 10.5834 9.10005 10.35L9.40005 7.97505C9.48338 7.34172 9.77505 6.82088 10.275 6.41255C10.775 6.00422 11.35 5.80005 12 5.80005C12.65 5.80005 13.225 6.00422 13.725 6.41255C14.225 6.82088 14.5167 7.34172 14.6 7.97505L14.9 10.35C14.9334 10.5834 14.875 10.7834 14.725 10.95C14.575 11.1167 14.3834 11.2 14.15 11.2H9.85005ZM9.77505 10.5H14.225L13.9 8.10005C13.8334 7.63338 13.6209 7.25005 13.2625 6.95005C12.9042 6.65005 12.4834 6.50005 12 6.50005C11.5167 6.50005 11.0959 6.65005 10.7375 6.95005C10.3792 7.25005 10.1667 7.63338 10.1 8.10005L9.77505 10.5ZM5.30005 17.45V16.9C5.30005 16.5334 5.41255 16.1875 5.63755 15.8625C5.86255 15.5375 6.16672 15.2834 6.55005 15.1C7.46672 14.6667 8.37922 14.3417 9.28755 14.125C10.1959 13.9084 11.1 13.8 12 13.8C12.9 13.8 13.8042 13.9084 14.7125 14.125C15.6209 14.3417 16.5334 14.6667 17.45 15.1C17.8334 15.2834 18.1375 15.5375 18.3625 15.8625C18.5875 16.1875 18.7 16.5334 18.7 16.9V17.45C18.7 17.6667 18.6292 17.8459 18.4875 17.9875C18.3459 18.1292 18.1667 18.2 17.95 18.2H6.05005C5.83338 18.2 5.65422 18.1292 5.51255 17.9875C5.37088 17.8459 5.30005 17.6667 5.30005 17.45ZM6.00005 17.5H18V16.9C18 16.6667 17.9209 16.4459 17.7625 16.2375C17.6042 16.0292 17.3834 15.85 17.1 15.7C16.3 15.3167 15.4709 15.0209 14.6125 14.8125C13.7542 14.6042 12.8834 14.5 12 14.5C11.1167 14.5 10.2459 14.6042 9.38755 14.8125C8.52922 15.0209 7.70005 15.3167 6.90005 15.7C6.61672 15.85 6.39588 16.0292 6.23755 16.2375C6.07922 16.4459 6.00005 16.6667 6.00005 16.9V17.5Z"
      fill="black"
    />
  </svg>
);
