"use client";
import Image from "next/image";
import Right from "./icons/Right";
import Carousel from "../temp/CarouselImg";
// import img1 from "@/publi";
import img2 from "../../../public/pizza.png";
import CarouselPage from "./CarouselPage";

export default function Hero() {
  const slides = ["/main-dish.png", "/pizza.png"];
  return (
    <div className="w-[80%] m-auto pt-11">
      <CarouselPage slides={slides} />
    </div> 
  );
}
