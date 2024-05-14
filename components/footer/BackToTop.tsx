import Icon from "../../components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  return (
    <>
      {content && (
        <div class="flex items-center justify-center fixed right-[20px] bottom-[50px] lg:right-[100px] ">
          <a href="#top" class="btn">
            {content} <Icon id="ChevronUp" width={24} height={24} />
          </a>
        </div>
      )}
    </>
  );
}
