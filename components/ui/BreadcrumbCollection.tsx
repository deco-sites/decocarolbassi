import type { BreadcrumbList } from "apps/commerce/types.ts";

type CollectionProps = {
  name: string;
  item: string;
};

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  collectionBreadcrumb: CollectionProps;
}

function BreadcrumbCollection(
  { itemListElement = [], collectionBreadcrumb }: Props,
) {
  const items = [
    { name: "Home", item: "/" },
    collectionBreadcrumb,
    ...itemListElement,
  ];

  return (
    <div class="hidden md:block breadcrumbs">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="text-secondary-neutral-700 uppercase text-xs last:text-dark-blue last:font-light">
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BreadcrumbCollection;
