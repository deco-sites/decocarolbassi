export interface Props {
  title: string;
  /** @format html */
  description: string;
}

export default function SeoText(props: Props) {
  return (
    <div className="text-center">
      <h2 className="">{props.title}</h2>
      <p className="" dangerouslySetInnerHTML={{ __html: props.description }} />
    </div>
  );
}
