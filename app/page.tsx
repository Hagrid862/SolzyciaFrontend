'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import 'react-material-symbols/rounded'
import cover1 from '@/assets/images/cover-jeep-1.jpg'
import offroadCard from '@/assets/images/jeep-offroad.jpg'
import survivalCard from '@/assets/images/survival.jpg'
import bushcraftCard from '@/assets/images/knife.jpg'
import gamesCard from '@/assets/images/games.jpg'
import logo from '@/assets/images/logo.png'
import jeepOffroadImage from '@/assets/images/jeep-offroad-mainpage.png'
import knifepng from '@/assets/images/knife.png'
import forest from '@/assets/images/forest.jpg'
import knife from '@/assets/images/knife.jpg'
import { Button, Card, CardBody } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <>
      <div className='w-full hidden flex-col items-center md:flex'>
        <div className='w-full h-[calc(100vh-64px)] relative'>
          <Image src={cover1} alt='cover' layout='fill' objectFit='cover' className='absolute opacity-75' />
          <div className='absolute top-1/2 transform -translate-y-1/2 left-12'>
            <h1 className='text-white text-6xl font-bold'>Sól życia</h1>
            <p className='text-white text-lg'>Lorem Ipsum dolor Sit amet.</p>
          </div>
        </div>
        <div className='max-w-[1200px] w-full flex flex-col justify-center items-center my-12 px-4'>
          <div className='text-3xl font-medium mb-4'>Oferta</div>
          <div className='flex flex-row gap-8 mx-8'>
            <div onMouseEnter={() => setHoveredCard(0)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{ aspectRatio: '2/3' }}>
                <Image
                  src={offroadCard}
                  alt='offroad'
                  className={`max-w-[250px] ${hoveredCard === 0 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{ transition: '0.3s ease all' }}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 0 ? 'bottom-0' : '-bottom-20'}`}
                  style={{ transition: '0.3s ease all' }}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Off-road</div>
            </div>
            <div onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{ aspectRatio: '2/3' }}>
                <Image
                  src={survivalCard}
                  alt='survival'
                  className={`max-w-[250px] ${hoveredCard === 1 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{ transition: '0.3s ease all' }}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 1 ? 'bottom-0' : '-bottom-20'}`}
                  style={{ transition: '0.3s ease all' }}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Survival</div>
            </div>
            <div onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{ aspectRatio: '2/3' }}>
                <Image
                  src={bushcraftCard}
                  alt='bushcraft'
                  className={`max-w-[250px] ${hoveredCard === 2 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{ transition: '0.3s ease all' }}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 2 ? 'bottom-0' : '-bottom-20'}`}
                  style={{ transition: '0.3s ease all' }}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Bushcraft</div>
            </div>
            <div onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{ aspectRatio: '2/3' }}>
                <Image
                  src={gamesCard}
                  alt='offroad'
                  className={`max-w-[250px] ${hoveredCard === 3 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{ transition: '0.3s ease all' }}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 3 ? 'bottom-0' : '-bottom-20'}`}
                  style={{ transition: '0.3s ease all' }}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Gry zespołowe</div>
            </div>
          </div>
          <div className='flex flex-row mt-12 w-full items-center'>
            <Image src={logo} alt='logo' className='md:w-1/4 lg:w-1/3 m-12 aspect-square' />
            <div className='text-justify'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere tortor vel mattis placerat.
              Nulla facilisi. Sed gravida nulla sit amet enim finibus mollis. Duis tempus commodo mauris, tincidunt
              porttitor lacus commodo sed. Nullam hendrerit vel arcu eu egestas. Ut dapibus ante est, et dapibus dolor
              tristique vel. Donec ac nisl vel sapien posuere congue. Suspendisse nisi sapien, scelerisque quis orci
              lacinia, dictum luctus erat. Sed sed lacus fringilla, sollicitudin odio et, mattis tellus. Pellentesque
              imperdiet odio erat, a aliquet lorem hendrerit non. Vivamus dapibus, lorem vel semper rutrum, libero eros
              malesuada mi, et finibus sem eros quis tellus. Aenean hendrerit sem eu elementum lacinia. Nullam vitae mi
              efficitur, congue quam nec, vulputate ante. Integer non aliquam ipsum, non viverra ante.
            </div>
          </div>
          <div className='flex flex-row mt-12 items-center justify-center'>
            <div>
              <div className='text-3xl font-semibold text-right'>Off-road</div>
              <div className='text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere tortor vel mattis placerat.
                Nulla facilisi. Sed gravida nulla sit amet enim finibus mollis. Duis tempus commodo mauris, tincidunt
                porttitor lacus commodo sed. Nullam hendrerit vel arcu eu egestas. Ut dapibus ante est, et dapibus dolor
                tristique vel. Donec ac nisl vel sapien posuere congue.
              </div>
              <div className='flex flex-row justify-center mt-4'>
                <Button className='mt-4' color='primary'>
                  Zobacz więcej
                </Button>
              </div>
            </div>
            <Image src={jeepOffroadImage} alt='off-road-jeep' className='md:w-1/3 lg:w-1/3 m-12' />
          </div>
          <div className='flex flex-row gap-4 w-full justify-center items-center'>
            <Image src={knifepng} alt='knife transparent background' className='w-1/4' />
            <div className='h-full flex flex-col items-center justify-center'>
              <div className='text-3xl font-semibold text-left w-full'>Survival</div>
              <div className='text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere tortor vel mattis placerat.
                Nulla facilisi. Sed gravida nulla sit amet enim finibus mollis. Duis tempus commodo mauris, tincidunt
                porttitor lacus commodo sed. Nullam hendrerit vel arcu eu egestas. Ut dapibus ante est, et dapibus dolor
                tristique vel. Donec ac nisl vel sapien posuere congue.
              </div>
              <div className='flex flex-row justify-center mt-4'>
                <Button className='mt-4' color='primary'>
                  Zobacz więcej
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center'>
          <div className='w-full max-w-[1400px]'>
            Solzycia.pl | &#169; all rights reserved | +48 123 123 123 | kontakt@solzycia.pl
          </div>
        </div>
      </div>
    </>
  )
}
