import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";

export interface Props {
  alerts?: {
    label: string;
    icon: AvailableIcons;
  }[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  device: string;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();
  return (
    <div id={id}>
      <Slider class="carousel carousel-center w-screen bg-secondary gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class={`text-sm text-secondary-content flex justify-center items-center w-screen h-[38px] gap-2 flex-row-reverse lg:flex-row`}>
              {alert.label}
              <Icon id={alert.icon} size={24} strokeWidth={1} />
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
