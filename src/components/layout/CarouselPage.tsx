import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Right from "./icons/Right";

export default function CarouselPage({ slides }: { slides: string[] }) {
  return (
    <Carousel interval={2000} controls={false}>
      {slides.map((s) => {
        return (
          <Carousel.Item key={s}>
            <section className="grid grid-cols-2 py-4 ml-10">
              <div className="py-4 md:py-12 m-auto">
                <h1 className="text-4xl font-semibold">
                  Everything
                  <br />
                  is better
                  <br />
                  with a&nbsp;
                  <span className="text-sky-600">Dish</span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                  Pizza is the missing piece that makes every day complete, a
                  simple yet delicious joy in life
                </p>
                <div className="flex gap-4 text-sm">
                  <button className="bg-cyan-400 flex items-center gap-2 text-white-600 px-4 py-1 rounded-full font-bold">
                    Order now <Right />
                  </button>
                  <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
                    Learn more <Right />
                  </button>
                </div>
              </div>
              <div className="hidden md:block" style={{width: '100%', height: '100%', position: 'relative'}}>
                <Image
                  src={s}
                  layout="fill"
                  objectFit="contain"
                  alt={s}
                ></Image>
              </div>
            </section>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
