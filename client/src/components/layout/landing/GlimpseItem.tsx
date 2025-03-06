import FadeToTransparentImage from "./FadeToTransparentImage";
import Image from "next/image";

interface Props {
  title: string;
  desc: string;
  imgSrc: string;
  index: number;
}

export default function GlimpseItem({ title, desc, imgSrc, index }: Props) {
  return (
    <div
      className={` flex max-md:flex-col-reverse ${
        index % 2 == 0 && "flex-row-reverse"
      } items-end justify-between gap-8`}
    >
      <div
        className={` ${
          index % 2 != 0 && "text-right"
        } w-[70%] max-md:text-center max-md:w-full`}
      >
        <h1 className="font-bold text-xl mb-2">{title}</h1>

        <p className="text-white/50">{desc}</p>
      </div>
      <FadeToTransparentImage
        index={index}
        className="relative"
        reverse={index % 2 == 0}
      >
        <Image
          src={imgSrc}
          alt="Glimpse"
          width={1920}
          height={892}
          className="rounded-lg"
        />
      </FadeToTransparentImage>
    </div>
  );
}
