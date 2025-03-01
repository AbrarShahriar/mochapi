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
      className={` flex ${
        index % 2 == 0 && "flex-row-reverse"
      } items-center justify-between gap-8`}
    >
      <div className={`max-w-[40%] ${index % 2 != 0 && "text-right"}`}>
        <h1 className="font-bold text-2xl mb-2">{title}</h1>

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
