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
        right: "50%",
      }}
      class={`animate-spin inline-block border-2 rounded-full ${
        showMore ? "absolute left-[46%] sm:left-[49%]" : ""
      } `}
      role="status"
    >
      <span class="hidden">Carregando...</span>
    </div>
  );
}

export default Spinner;
