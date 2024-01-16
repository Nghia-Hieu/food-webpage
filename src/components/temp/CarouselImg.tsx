import { useState } from "react";
import Image from "next/image";
import Right from "../layout/icons/Right";
import CarouselItems from "./CarouselItem";

export default function Carousel({ slides }: { slides: string[] }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s) => {
          // return <CarouselItems image={s} key={s}/>
          return (
            <img src={s} key={s} style={{ width: "100%", height: "75vh" }} />
          );
          // return <Image src={s} layout="fill" objectFit="contain" alt="main-dish" key={s}></Image>
          // return (
          //   <section className="grid grid-cols-2 py-4 " key={s}>
          //     <div className="relative">
          //       <Image
          //         src={s}
          //         layout="fill"
          //         objectFit="contain"
          //         alt="main-dish"
          //       ></Image>
          //     </div>
          //     <div className="py-8 md:py-12">
          //       <h1 className="text-4xl font-semibold">
          //         Everything
          //         <br />
          //         is better
          //         <br />
          //         with a&nbsp;
          //         <span className="text-sky-600">Dish</span>
          //       </h1>
          //       <p className="my-6 text-gray-500 text-sm">
          //         Pizza is the missing piece that makes every day complete, a
          //         simple yet delicious joy in life
          //       </p>
          //       <div className="flex gap-4 text-sm">
          //         <button className="bg-cyan-400 flex items-center gap-2 text-white-600 px-4 py-1 rounded-full font-bold">
          //           Order now
          //           <Right />
          //         </button>
          //         <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
          //           Learn more
          //           <Right />
          //         </button>
          //       </div>
          //     </div>

          //   </section>
          // );
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <svg
            className="w-4 h-4 text-white dark:text-gray-500 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </button>
        <button onClick={nextSlide}>
          <svg
            className="w-4 h-4 text-white dark:text-gray-500 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>{" "}
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
