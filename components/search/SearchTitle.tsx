export default function SearchTitle({ title }: { title: string }) {
  const pageTitle = title.replaceAll("-", " ") ?? title;
  return (
    <h2 class="ml-[12px] mt-10 md:mt-0 md:ml-0 text-[16px] font-light md:font-normal md:text-2xl text-dark-blue md:mb-6 uppercase">
      {pageTitle}
    </h2>
  );
}
