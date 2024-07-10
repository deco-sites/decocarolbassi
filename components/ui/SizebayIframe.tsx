import { ComponentChildren } from "preact";

export interface Props {
  url: string;
  children: ComponentChildren;
}

const runOnMount = () => {
  const iFrame = document.getElementById(
    "sizebay-iframe",
  ) as HTMLIFrameElement;

  if (!iFrame) {
    return console.error("Couldn't find iframe");
  }
};

function SizebayIframe({
  url = "",
  children,
}: Props) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(${runOnMount})();` }}>
      </script>
      <div class="w-full text-center">
        <main class="block max-w-[948px] w-screen h-[540px] m-auto relative">
          <iframe
            src={url}
            id="sizebay-iframe"
            class={`w-full text-center`}
            frameBorder="0"
            height={550}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          >
          </iframe>
          {children}
        </main>
      </div>
    </>
  );
}

export default SizebayIframe;
