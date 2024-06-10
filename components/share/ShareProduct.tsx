import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { useCallback } from "preact/hooks";
import Icon from "../ui/Icon.tsx";
import Modal from "../ui/Modal.tsx";

export type MediaOptionProps = {
  title: string;
  icon: ImageWidget | string;
  href: string;
};

export type Props = {
  product: Product;
  device: Device;
  options: MediaOptionProps[];
};

const defaultOptions: MediaOptionProps[] = [
  {
    title: "Facebook",
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/743cc7f0-edd6-4e03-8408-7b6a2db92636",
    href: "",
  },
  {
    title: "Whatsapp",
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/11729113-f4f5-493e-aa53-81f83394e3fb",
    href: "",
  },
  {
    title: "X",
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/f06ae3b3-e8bc-42ca-abde-53fb14e9d754",
    href: "",
  },
];

function ShareProduct({ product, device, options }: Props) {
  const isOpen = useSignal<boolean>(false);
  const socialOptions = options ?? defaultOptions;

  const renderOption = useCallback(
    (option: MediaOptionProps, _index: number) => {
      const pageUrl = encodeURIComponent(window.location.href);
      const imageUrl = encodeURIComponent(
        String(product.image?.[0].url),
      );

      const href = option.href
        .replace("{pageUrl}", pageUrl)
        .replace("{imageUrl}", imageUrl);

      return (
        <a
          title={option.title}
          href={href}
          target="_blank"
          rel="noreferrer"
          key={option.title}
        >
          <Image src={option.icon} width={48} height={48} alt={option.title} />
        </a>
      );
    },
    [isOpen],
  );

  const productSharingControl = () => {
    if (device === "mobile") {
      nativeSharingAPI();
      return;
    } else {
      isOpen.value = true;
    }
  };

  const nativeSharingAPI = () => {
    const pageUrl = window.location.href;

    navigator
      .share({
        title: "",
        url: pageUrl,
      });
  };

  return (
    <>
      <div
        className="btn btn-circle"
        onClick={productSharingControl}
      >
        <ShareIcon />
      </div>

      {device === "desktop" && (
        <Modal
          open={isOpen.value}
          class="flex items-center justify-center rounded-md"
          onClose={() => isOpen.value = false}
        >
          <div className=" w-full h-full">
            <div class="bg-secondary-neutral-100 p-8 w-[450px] m-auto relative">
              <button
                className="absolute btn-square top-[10px] right-0"
                onClick={() => {
                  isOpen.value = false;
                }}
              >
                <Icon id="XMark" size={24} strokeWidth={1} />
              </button>
              <h1 className="m-8 ">
                Compartilhe esse produto nas redes sociais!
              </h1>
              <div className="flex items-center justify-center gap-4">
                {socialOptions.map(renderOption)}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ShareProduct;

const ShareIcon = () => (
  <svg
    width={18}
    height={20}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.0023 19.5C14.3084 19.5 13.7179 19.2569 13.2308 18.7708C12.7436 18.2847 12.5 17.6945 12.5 17C12.5 16.867 12.5115 16.7293 12.5346 16.5868C12.5577 16.4443 12.5923 16.3103 12.6385 16.1846L4.89615 11.6231C4.65128 11.8987 4.36667 12.1138 4.0423 12.2683C3.71795 12.4228 3.37052 12.5 3 12.5C2.30555 12.5 1.71528 12.2572 1.22918 11.7715C0.743059 11.2858 0.5 10.6961 0.5 10.0022C0.5 9.30843 0.743059 8.71794 1.22918 8.23078C1.71528 7.74359 2.30555 7.5 3 7.5C3.37052 7.5 3.71795 7.57724 4.0423 7.73172C4.36667 7.88621 4.65128 8.10128 4.89615 8.37693L12.6385 3.81537C12.5923 3.68974 12.5577 3.55568 12.5346 3.4132C12.5115 3.27072 12.5 3.13298 12.5 3C12.5 2.30555 12.7428 1.71527 13.2285 1.22917C13.7142 0.743058 14.3039 0.5 14.9977 0.5C15.6916 0.5 16.2821 0.742834 16.7692 1.2285C17.2564 1.71418 17.5 2.30393 17.5 2.99773C17.5 3.69156 17.2569 4.28206 16.7708 4.76922C16.2847 5.25641 15.6945 5.5 15 5.5C14.6295 5.5 14.2821 5.42276 13.9577 5.26828C13.6333 5.11379 13.3487 4.89872 13.1039 4.62307L5.36155 9.18463C5.4077 9.31026 5.44232 9.44387 5.4654 9.58545C5.48847 9.72702 5.5 9.86388 5.5 9.99603C5.5 10.1282 5.48847 10.2663 5.4654 10.4106C5.44232 10.5548 5.4077 10.6897 5.36155 10.8154L13.1039 15.3769C13.3487 15.1013 13.6333 14.8862 13.9577 14.7317C14.2821 14.5772 14.6295 14.5 15 14.5C15.6945 14.5 16.2847 14.7428 16.7708 15.2285C17.2569 15.7142 17.5 16.3039 17.5 16.9978C17.5 17.6916 17.2572 18.2821 16.7715 18.7692C16.2858 19.2564 15.6961 19.5 15.0023 19.5ZM15 4.5C15.4115 4.5 15.7644 4.35288 16.0587 4.05865C16.3529 3.76442 16.5 3.41153 16.5 3C16.5 2.58847 16.3529 2.23558 16.0587 1.94135C15.7644 1.64712 15.4115 1.5 15 1.5C14.5885 1.5 14.2356 1.64712 13.9413 1.94135C13.6471 2.23558 13.5 2.58847 13.5 3C13.5 3.41153 13.6471 3.76442 13.9413 4.05865C14.2356 4.35288 14.5885 4.5 15 4.5ZM3 11.5C3.41153 11.5 3.76442 11.3529 4.05865 11.0587C4.35288 10.7644 4.5 10.4115 4.5 10C4.5 9.58847 4.35288 9.23558 4.05865 8.94135C3.76442 8.64712 3.41153 8.5 3 8.5C2.58847 8.5 2.23558 8.64712 1.94135 8.94135C1.64712 9.23558 1.5 9.58847 1.5 10C1.5 10.4115 1.64712 10.7644 1.94135 11.0587C2.23558 11.3529 2.58847 11.5 3 11.5ZM15 18.5C15.4115 18.5 15.7644 18.3529 16.0587 18.0587C16.3529 17.7644 16.5 17.4115 16.5 17C16.5 16.5885 16.3529 16.2356 16.0587 15.9413C15.7644 15.6471 15.4115 15.5 15 15.5C14.5885 15.5 14.2356 15.6471 13.9413 15.9413C13.6471 16.2356 13.5 16.5885 13.5 17C13.5 17.4115 13.6471 17.7644 13.9413 18.0587C14.2356 18.3529 14.5885 18.5 15 18.5Z"
      fill="#121926"
    />
  </svg>
);
