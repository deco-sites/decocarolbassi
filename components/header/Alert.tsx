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

  /**
   * @title Light Theme Bar
   * @description active the light theme bar
   */
  lightTheme?: boolean;
}

function Alert({ alerts = [], interval = 5, lightTheme = false }: Props) {
  const id = useId();
  return (
    <div id={id}>
      <Slider
        class={`carousel carousel-center w-screen ${
          lightTheme ? "bg-secondary-neutral-300" : "bg-secondary"
        } gap-6`}
      >
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span
              class={`text-sm text-center ${
                lightTheme ? "text-primary-600" : "text-secondary-content"
              } flex p-2 justify-center items-center w-screen gap-2 flex-row-reverse lg:flex-row`}
            >
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
