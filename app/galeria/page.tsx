'use client'

import image1 from '@/assets/images/games.jpg'
import image2 from '@/assets/images/jeep-offroad.jpg'
import image3 from '@/assets/images/knife.jpg'
import image4 from '@/assets/images/survival.jpg'

import Image from 'next/image'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { useState } from 'react'

export default function galleryPage() {
  const images = [
    {
      image: image1,
      title: 'Games',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.'
    },
    {
      image: image2,
      title: 'Jeep Offroad',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.'
    },
    {
      image: image3,
      title: 'Knife',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.'
    },
    {
      image: image4,
      title: 'Survival',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.'
    }
  ]
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center'>
      <Card className='max-w-[1200px] w-full min-h-32 mt-12 h-[calc(100vh-64px-6rem)] max-h-[1200px] hidden flex-col md:flex'>
        <div className='w-full flex flex-row gap-3 max-h-[960px] h-4/5'>
          <div className='w-[calc(75%-0.5rem)] relative p-4'>
            <Image
              src={images[currentImage].image}
              alt='gallery-image'
              layout='fill'
              objectFit='contain'
              className='rounded-lg'
            />
          </div>
          <Divider orientation={'vertical'} />
          <div className='w-[calc(25%-0.6rem)] overflow-auto flex flex-col gap-2 items-center overflow-y-auto'>
            <div />
            {images.map((image, index) => (
              <Card
                isPressable
                key={index}
                className={`${currentImage === index ? 'outline-2 outline-[#777777]' : 'outline-0'} bg-opacity-15 rounded-lg w-[90%] aspect-square overflow-hidden bg-white flex relative h-full min-h-[150px]`}>
                <Image
                  src={image.image}
                  alt='gallery-image'
                  layout='fill'
                  objectFit='contain'
                  className='rounded-lg cursor-pointer'
                  onClick={() => setCurrentImage(index)}
                />
              </Card>
            ))}
            <div />
          </div>
        </div>
        <Divider />
        <CardBody>
          <div className='text-3xl font-semibold'>{images[currentImage].title}</div>
          <div className='text-lg'>{images[currentImage].description}</div>
        </CardBody>
      </Card>
    </div>
  )
}
