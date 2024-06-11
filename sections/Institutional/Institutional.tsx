import { HTMLWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Icon from "../../components/ui/Icon.tsx";

type TopicProps = {
  topicTitle: string;
  topicDescription: HTMLWidget;
  faq?: Array<{
    faqTitle: string;
    faqDescription: HTMLWidget;
    isOpen?: boolean;
  }>;
};

export interface Props {
  institutionalTitle: string;
  topics: TopicProps[];
}

function Topic(props: TopicProps) {
  return (
    <div class="m-10 font-light institutional">
      <h3 class="uppercase text-dark-blue text-base">{props.topicTitle}</h3>
      <div class="text-[#4B5565] text-sm mt-1">
        <p dangerouslySetInnerHTML={{ __html: props.topicDescription }} />
      </div>
      {props.faq && props.faq.map((faq) => {
        const { isOpen = false } = faq;
        console.log({ isOpen });

        return (
          <div>
            <button
              class="flex font-light hover:underline justify-center items-center text-paragraph-color text-base w-auto"
              {...usePartialSection({
                props: { isOpen: !isOpen },
              })}
            >
              {faq.faqTitle}
              {!isOpen
                ? <Icon id="ArrowDown" size={26} />
                : <Icon id="ArrowDown" size={26} class={"rotate-180"} />}
            </button>

            {isOpen && <p>{faq.faqDescription}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function Institutional({ institutionalTitle, topics }: Props) {
  return (
    <main class="p-8 max-w-[1700px] m-auto">
      {/* <Breadcrumb itemListElement={[{item: "/termos-e-condicoes",}]}/> */}
      <h1 class="text-dark-blue m-8 text-center text-[56px] uppercase">
        {institutionalTitle}
      </h1>
      {topics.map((topic) => <Topic {...topic} />)}
    </main>
  );
}
