export default function SearchTitle({ title }: { title: string }) {
  return (
    <h2 class="ml-[12px] mt-[21px] md:mt-0 md:ml-0 text-[16px] font-light md:font-normal md:text-2xl text-dark-blue md:mb-6">
      {title}
    </h2>
  );
}
