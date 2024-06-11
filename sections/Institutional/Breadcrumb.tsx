interface Props {
  itemListElement: Array<{
    name: string;
    item: string;
  }>;
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="hidden md:block breadcrumbs py-4">
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

export default Breadcrumb;
