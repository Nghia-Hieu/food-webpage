import Right from "../layout/icons/Right";
import Image from "next/image";

export default function CarouselItems({ image }: { image: string }) {
  return (
    <section className="grid grid-cols-2 py-4 ">
      <div className="relative">
        <Image
          src={image}
          layout="fill"
          objectFit="contain"
          alt={image}
        ></Image>
      </div>
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-sky-600">Dish</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-cyan-400 flex items-center gap-2 text-white-600 px-4 py-1 rounded-full font-bold">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
    </section>
  );
}
