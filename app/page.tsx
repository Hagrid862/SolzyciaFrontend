'use client'
import { useRef, useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import Image from "next/image";
import 'react-material-symbols/rounded';
import cover1 from '@/assets/images/cover-jeep-1.jpg';
import offroadCard from '@/assets/images/jeep-offroad.jpg';
import survivalCard from '@/assets/images/survival.jpg';
import bushcraftCard from '@/assets/images/knife.jpg';
import gamesCard from '@/assets/images/games.jpg';
import logo from '@/assets/images/logo.png';
import jeepOffroadImage from '@/assets/images/jeep-offroad-mainpage.png';
import jungleBg from '@/assets/images/jungle.jpg';
import {Button, Card, CardBody} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
        <div className='max-w-[1200px] w-full flex flex-col justify-center items-center my-12'>
          <div className='text-3xl font-medium mb-4'>
            Oferta
          </div>
          <div className='flex flex-row gap-8 mx-8'>
            <div onMouseEnter={() => setHoveredCard(0)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image src={offroadCard} alt='offroad'
                       className={`max-w-[250px] ${hoveredCard === 0 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                       style={{transition: '0.3s ease all'}}/>
                <Button className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 0 ? 'bottom-0' : '-bottom-20'}`}
                        style={{transition: '0.3s ease all'}}>Zobacz więcej</Button>
              </Card>
              <div className='text-xl text-center mt-2'>
                Off-road
              </div>
            </div>
            <div onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image src={survivalCard} alt='survival'
                       className={`max-w-[250px] ${hoveredCard === 1 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                       style={{transition: '0.3s ease all'}}/>
                <Button className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 1 ? 'bottom-0' : '-bottom-20'}`}
                        style={{transition: '0.3s ease all'}}>Zobacz więcej</Button>
              </Card>
              <div className='text-xl text-center mt-2'>
                Survival
              </div>
            </div>
            <div onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image src={bushcraftCard} alt='bushcraft'
                       className={`max-w-[250px] ${hoveredCard === 2 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                       style={{transition: '0.3s ease all'}}/>
                <Button className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 2 ? 'bottom-0' : '-bottom-20'}`}
                        style={{transition: '0.3s ease all'}}>Zobacz więcej</Button>
              </Card>
              <div className='text-xl text-center mt-2'>
                Bushcraft
              </div>
            </div>
            <div onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image src={gamesCard} alt='offroad'
                       className={`max-w-[250px] ${hoveredCard === 3 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                       style={{transition: '0.3s ease all'}}/>
                <Button className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 3 ? 'bottom-0' : '-bottom-20'}`} style={{transition: '0.3s ease all'}}>Zobacz więcej</Button>
              </Card>
              <div className='text-xl text-center mt-2'>
                Off-road
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}