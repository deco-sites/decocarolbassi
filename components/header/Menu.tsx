import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem(
  { item, childNode }: { item: SiteNavigationElement; childNode?: boolean },
) {
  const notHasChildren = childNode || !item.children;

  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" class={`${notHasChildren ? "hidden" : ""}`} />
      {notHasChildren
        ? (
          <a href={item.url}>
            <div
              class={`${
                !item.children ? "m-4 text-base" : ""
              } text-sm font-light m-2 text-primary-900`}
            >
              {item.name}
            </div>
          </a>
        )
        : (
          <div class="collapse-title text-base font-light text-primary-900 menu">
            {item.name}
          </div>
        )}
      <div class="collapse-content">
        <ul>
          <li class="my-[5px]">
            <a
              class="underline text-sm font-light m-2 text-primary-900 h-5"
              href={item.url}
            >
              Ver todos
            </a>
          </li>
          {item.children?.map((node) => (
            <li>
              <a href={node.url}>
                <MenuItem childNode item={node} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  const { cart } = useCart();
  const {
    items: cartItems = [],
  } = cart.value ?? {};

  const totalItems = cartItems.length;

  return (
    <div class="flex flex-col h-full w-[350px]">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 mt-4">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex justify-evenly py-2 bg-base-200">
        <li class="w-full">
          <a
            class="flex flex-col items-center px-4 py-4 m-3 border-2 border-dotted border-secondary-neutral-600"
            href="/user-myaccount"
          >
            <UserIcon />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
        <li class="w-full">
          <a
            class="flex flex-col relative items-center px-4 py-4 m-3 border-2 border-dotted border-secondary-neutral-600"
            href="/checkout"
          >
            <span
              class={`indicator-item absolute badge badge-[#FD545F] w-[8px] h-[8px] bg-[#FD545F] border-[#FD545F] top-[31px] right-[63px] p-0 ${
                totalItems === 0 ? "hidden" : ""
              }`}
            >
            </span>
            <Icon id="ShoppingCart" size={26} strokeWidth={2} />
            <span class="text-sm">Sacola</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

const UserIcon = () => (
  <svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.8498 11.2C9.61647 11.2 9.4248 11.1167 9.2748 10.95C9.1248 10.7834 9.06647 10.5834 9.0998 10.35L9.3998 7.97505C9.48314 7.34172 9.7748 6.82088 10.2748 6.41255C10.7748 6.00422 11.3498 5.80005 11.9998 5.80005C12.6498 5.80005 13.2248 6.00422 13.7248 6.41255C14.2248 6.82088 14.5165 7.34172 14.5998 7.97505L14.8998 10.35C14.9331 10.5834 14.8748 10.7834 14.7248 10.95C14.5748 11.1167 14.3831 11.2 14.1498 11.2H9.8498ZM9.7748 10.5H14.2248L13.8998 8.10005C13.8331 7.63338 13.6206 7.25005 13.2623 6.95005C12.904 6.65005 12.4831 6.50005 11.9998 6.50005C11.5165 6.50005 11.0956 6.65005 10.7373 6.95005C10.379 7.25005 10.1665 7.63338 10.0998 8.10005L9.7748 10.5ZM5.2998 17.45V16.9C5.2998 16.5334 5.4123 16.1875 5.6373 15.8625C5.8623 15.5375 6.16647 15.2834 6.5498 15.1C7.46647 14.6667 8.37897 14.3417 9.2873 14.125C10.1956 13.9084 11.0998 13.8 11.9998 13.8C12.8998 13.8 13.804 13.9084 14.7123 14.125C15.6206 14.3417 16.5331 14.6667 17.4498 15.1C17.8331 15.2834 18.1373 15.5375 18.3623 15.8625C18.5873 16.1875 18.6998 16.5334 18.6998 16.9V17.45C18.6998 17.6667 18.629 17.8459 18.4873 17.9875C18.3456 18.1292 18.1665 18.2 17.9498 18.2H6.0498C5.83314 18.2 5.65397 18.1292 5.5123 17.9875C5.37064 17.8459 5.2998 17.6667 5.2998 17.45ZM5.9998 17.5H17.9998V16.9C17.9998 16.6667 17.9206 16.4459 17.7623 16.2375C17.604 16.0292 17.3831 15.85 17.0998 15.7C16.2998 15.3167 15.4706 15.0209 14.6123 14.8125C13.754 14.6042 12.8831 14.5 11.9998 14.5C11.1165 14.5 10.2456 14.6042 9.3873 14.8125C8.52897 15.0209 7.6998 15.3167 6.8998 15.7C6.61647 15.85 6.39564 16.0292 6.2373 16.2375C6.07897 16.4459 5.9998 16.6667 5.9998 16.9V17.5Z"
      fill="black"
    />
  </svg>
);
