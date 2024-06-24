interface Props {
  size?: number;
  showMore?: boolean;
}

function Spinner({ size = 20, showMore = true }: Props) {
  return (
    <div
      style={{
        verticalAlign: "-0.125em",
        border: "0.125em solid",
        borderRightColor: "transparent",
        width: size,
        height: size,
      }}
      class={`animate-spin inline-block border-2 rounded-full ${
        showMore ? "absolute right-2/4 left-[48.5%]" : ""
      } `}
      role="status"
    >
      <span class="hidden">Carregando...</span>
    </div>
  );
}

export default Spinner;
