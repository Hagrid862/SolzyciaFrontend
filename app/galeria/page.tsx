"use client";

import image1 from "@/assets/images/galeria/1.jpg";
import image2 from "@/assets/images/galeria/2.jpg";
import image3 from "@/assets/images/galeria/3.jpg";
import image4 from "@/assets/images/galeria/4.jpg";
import image5 from "@/assets/images/galeria/5.jpg";
import image6 from "@/assets/images/galeria/6.jpg";
import image7 from "@/assets/images/galeria/7.jpg";

import Image from "next/image";
import { Card, CardBody, Divider } from "@heroui/react";
import { useState } from "react";

export default function GalleryPage() {
  const images = [image1, image2, image3, image4, image5, image6, image7];
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center mx-2">
      <Card className="max-w-[1200px] w-full min-h-32 mt-12 h-[calc(100vh-64px-6rem)] max-h-[1000px] flex-col flex">
        <div className="w-full flex flex-col md:flex-row gap-3 h-full">
          <div className="md:w-[calc(75%-0.5rem)] relative h-full p-4">
            <Image
              src={images[currentImage]}
              alt="gallery-image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg w-full"
            />
          </div>
          <Divider orientation={"vertical"} className="hidden md:block" />
          <Divider className="block md:hidden" />
          <div className="md:w-[calc(25%-0.6rem)] md:overflow-y-auto md:overflow-x-hidden overflow-y-hidden overflow-x-scroll flex md:flex-col gap-2 items-center min-h-[160px] md:h-full py-4 md:max-h-full max-h-[15vh]">
            <div />
            {images.map((image, index) => (
              <Card
                isPressable
                key={index}
                className={`${currentImage === index ? "outline-2 outline-[#777777]" : "outline-0"} bg-opacity-15 rounded-lg w-[90%] aspect-square overflow-hidden bg-white flex relative h-full min-w-[150px]  min-h-[150px]`}
              >
                <Image
                  src={image}
                  alt="gallery-image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg cursor-pointer"
                  onClick={() => setCurrentImage(index)}
                />
              </Card>
            ))}
            <div />
          </div>
        </div>
      </Card>
    </div>
  );
}
