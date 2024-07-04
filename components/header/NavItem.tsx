import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../ui/Icon.tsx";
import { headerHeight } from "./constants.ts";

function NavItem(
  { item, itemsPerColumn }: {
    item: SiteNavigationElement;
    itemsPerColumn: number;
  },
) {
  const { url, name, children } = item;
  const images = item?.image;

  const numChildren = children ? children.length : 0;
  const numColumns = Math.ceil(numChildren / itemsPerColumn);

  return (
    <li className="group flex items-center relative">
      <a href={url} className="py-6">
        <span
          className={"group-hover:underline text-sm font-thin flex items-center gap-2 text-paragraph-color"}
        >
          {name}
          {children && children.length > 0 && (
            <Icon id={"ArrowDown"} size={26} />
          )}
        </span>
      </a>

      {children && children.length > 0 && (
        <div
          className={`fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-around gap-6 border-t border-b-2 border-base-200 w-screen shadow-header`}
          style={{ top: "0px", left: "0px", marginTop: headerHeight }}
        >
          <div class="flex items-start">
            {[...Array(numColumns)].map((_, columnIndex) => (
              <ul
                key={columnIndex}
                className="flex items-start justify-center gap-6 flex-col mt-6 mr-8 mb-8"
              >
                {children.slice(
                  columnIndex * itemsPerColumn,
                  (columnIndex + 1) * itemsPerColumn,
                ).map((node) => (
                  <li key={node.name}>
                    <a className="hover:underline" href={node.url}>
                      <span class="text-paragraph-color text-[14px] font-light">
                        {node.name}
                      </span>
                    </a>
                    {node.children && node.children.length > 0 && (
                      <ul className="flex flex-col gap-1 mt-8">
                        {node.children.map((leaf) => (
                          <li key={leaf.name}>
                            <a className="hover:underline" href={leaf.url}>
                              <span className="text-xs">{leaf.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div class="flex gap-2 ml-3">
            {images?.map((image) =>
              image?.url && (
                <a href={image.thumbnailUrl}>
                  <Image
                    key={image.url}
                    className="px-6 pt-6"
                    src={image.url}
                    alt={image.alternateName}
                    width={300}
                    height={332}
                    loading="lazy"
                  />

                  <h3 class="px-6 text-sm text-[#121926] my-2">
                    {image.contentUrl}
                  </h3>
                </a>
              )
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
