export type Item = {
  label: string;
  href: string;
  openNewTab?: boolean;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 2xl:px-[3rem] ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-medium text-lg text-secondary-paragraph-color">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block py-1 link link-hover font-light"
                          target={item.openNewTab ? "_blank" : ""}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-8 text-center">
            {sections.map((section) => (
              <li class="mb-1">
                <div>
                  <label
                    htmlFor={section.label}
                    class="text-[18px] lg:text-[21px] collapse-title min-h-[0] !p-0 flex gap-2 justify-center text-paragraph-color font-semibold"
                  >
                    <span>{section.label}</span>
                  </label>
                  <div class="">
                    <ul
                      class={`flex flex-col gap-1 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="text-[13px] lg:text-[16px] block py-1 link link-hover font-light"
                            target={item.openNewTab ? "_blank" : ""}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
