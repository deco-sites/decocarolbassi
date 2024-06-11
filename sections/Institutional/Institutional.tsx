import { HTMLWidget } from "apps/admin/widgets.ts";
import Faq from "../../islands/Faq.tsx";
import Breadcrumb from "./Breadcrumb.tsx";
import { AppContext } from "../../apps/site.ts";
import { SectionProps } from "deco/types.ts";

/**
 * @title {{{faqTitle}}}
 */
interface FaqProps {
  faqTitle: string;
  faqDescription: HTMLWidget;
}

/**
 * @title {{{topicTitle}}}
 */
interface TopicProps {
  topicTitle: string;
  topicDescription: HTMLWidget;
  faq?: FaqProps[];
}

export interface Props {
  institutionalTitle: string;
  topics: TopicProps[];
}

function Topic(props: TopicProps) {
  return (
    <div class="my-8 md:m-10 font-light institutional">
      <h3 class="uppercase text-dark-blue text-base">{props.topicTitle}</h3>
      <div class="text-[#4B5565] text-sm mt-1">
        <p dangerouslySetInnerHTML={{ __html: props.topicDescription }} />
      </div>
      {props.faq && props.faq.map((faq) => <Faq {...faq} />)}
    </div>
  );
}

function Institutional(
  { institutionalTitle, topics, url }: SectionProps<typeof loader>,
) {
  const pathname = url.pathname;
  return (
    <main class="p-4 lg:px-8 max-w-[1700px] m-auto">
      <Breadcrumb
        itemListElement={[{ name: institutionalTitle, item: pathname }]}
      />

      <h1 class="text-dark-blue my-8 mt-8 lg:mt-[80px] lg:mb-[40px] text-center text-xl lg:text-[56px] uppercase">
        {institutionalTitle}
      </h1>
      {topics.map((topic, index) => <Topic key={index} {...topic} />)}
    </main>
  );
}

export const loader = (props: Props, req: Request, _ctx: AppContext) => {
  const url = new URL(req.url);
  return {
    ...props,
    url: url,
  };
};

export default Institutional;
