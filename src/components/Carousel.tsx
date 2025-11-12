import { useEffect, useState } from "react";
import arrowRightIcon from "./../assets/arrow-right.svg";

type CarouselItem = {
  imageUrl?: string;
  title: string;
  description: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

export default function Carousel({ items }: CarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const current = items[index];

  function next() {
    setIndex((prev) => (prev + 1) % items.length);
  }

  function previous() {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative flex flex-col items-center w-full bg-gray-100 mx-auto overflow-hidden py-16">
      {/* Image (mobile) */}
      {current.imageUrl ? (
        <img
          src={current.imageUrl}
          alt={current.title}
          className="w-full max-w-[80%] md:max-w-[60%] h-64 object-cover lg:hidden"
        />
      ) : (
        <div className="w-full max-w-[80%] md:max-w-[60%] h-64 bg-green-200 mt-16 lg:hidden" />
      )}

      {/* Text and image (desktop) */}
      <div className="flex flex-col items-center gap-4 w-full lg:flex-row lg:justify-between lg:max-w-[80%] px-16 lg:px-4 mt-4">
        <div className="flex flex-col gap-4 text-center lg:text-left lg:w-1/2">
          <h3 className="text-lg font-bold">{current.title}</h3>
          <p className="text-sm">{current.description}</p>

          <button className="rounded bg-white flex items-center justify-center max-w-40 gap-2 px-4 py-1  mx-auto lg:mx-0 hover:bg-black/10 hover:cursor-pointer">
            <span className="font-semibold">Selengkapnya</span>
            <img src={arrowRightIcon} className="w-3 h-3" />
          </button>
        </div>

        {current.imageUrl ? (
          <img
            src={current.imageUrl}
            alt={current.title}
            className="hidden lg:block w-full max-w-[40%] h-96 object-cover rounded-lg"
          />
        ) : (
          <div className="hidden lg:block w-full max-w-[40%] h-96 bg-green-200 rounded-lg" />
        )}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={previous}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full py-3 px-4 shadow hidden lg:block"
      >
        <img src={arrowRightIcon} className="rotate-180" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full py-3 px-4 shadow hidden lg:block"
      >
        <img src={arrowRightIcon} className="" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
