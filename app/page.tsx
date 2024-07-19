'use client'
import { useRef, useState, useEffect } from 'react';
import {Parallax, ParallaxBannerLayer, ParallaxProvider} from "react-scroll-parallax";
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
  const [coverProgress, setCoverProgress] = useState(0);
  const [offerCardProgress, setOfferCardProgress] = useState(0);
  const [aboutTextProgress, setAboutTextProgress] = useState(0);
  const [offroadTitleProgress, setOffroadTitleProgress] = useState(0);
  const [offroadDescriptionProgress, setOffroadDescriptionProgress] = useState(0);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      <style jsx>{`
        //.transition-effect {
        //  transition: all 0.5s ease, transform 0.3s ease-out;
        //}
      `}</style>
      <div className='w-full'>
        <div className="overflow-auto hidden md:block"
             style={{height: '500vh', maxHeight: '500vh'}}>
          <ParallaxProvider>
            <div className='flex justify-center relative h-[calc(100vh)]' style={{
              opacity: (coverProgress -0.9) * -10,
              filter: `blur(${(coverProgress - 0.7) * 100}px)`,
            }}>
              <Parallax onProgressChange={setCoverProgress} className='absolute' scale={[1.5, 0.95]}>
                <Image src={cover1} alt='image' className='w-full' style={{borderRadius: '0rem 0rem 1rem 1rem '}}/>
              </Parallax>
              <Parallax className='mt-[50vh] ml-16' translate='yes' translateY={['0px', '-250px']}>
                <div className='text-8xl font-medium'>Sól życia</div>
                <div className='text-4xl font-light'>żyj na dziko</div>
              </Parallax>
            </div>
            <div className='flex flex-col items-center w-full'>
              <div className='w-full max-w-[1200px] '>
                <Parallax className='flex' onProgressChange={setOfferCardProgress}>
                  <div>
                  </div>
                  <div className='m-4 w-full flex flex-row gap-4 transition-effect' style={{
                    opacity: offerCardProgress < 0.1 ? 0 : (offerCardProgress - 0.1) * 5,
                    transform: `scale(${offerCardProgress < 0.1 ? 0.7 : offerCardProgress > 0.4 ? offerCardProgress > 0.8 && 1 - (offerCardProgress - 0.8) : (offerCardProgress - 0.1) + 0.7})`,
                    filter: `blur(${offerCardProgress > 0.4 ? 0 : (60 - offerCardProgress * 150)}px)`,
                  }}>
                    <div className='w-full' onMouseEnter={() => setHoveredCard(0)}
                         onMouseLeave={() => setHoveredCard(null)}>
                      <Card className='w-full aspect-2/3 relative' style={{aspectRatio: '2/3'}}>
                        <Image src={offroadCard} alt='image'
                               className='z-50 w-full rounded-xl absolute transition-all ease-in-out duration-300'
                               style={{transform: `translateY(${hoveredCard === 0 ? '-150px' : '0'}) scale(${hoveredCard === 0 ? '0.95' : '1'})`}}/>
                        <div className=' absolute bottom-0 w-full'>
                    <span className='text-2xl flex flex-col items-center justify-center gap-4 mb-8'>
                      Off-Road
                      <Button>
                        Dowiedz się więcej
                      </Button>
                    </span>
                        </div>
                      </Card>
                    </div>
                    <div className='w-full' onMouseEnter={() => setHoveredCard(1)}
                         onMouseLeave={() => setHoveredCard(null)}>
                      <Card className='w-full aspect-2/3 relative' style={{aspectRatio: '2/3'}}>
                        <Image src={survivalCard} alt='image'
                               className='z-50 w-full rounded-xl absolute transition-all ease-in-out duration-300'
                               style={{transform: `translateY(${hoveredCard === 1 ? '-150px' : '0'}) scale(${hoveredCard === 1 ? '0.95' : '1'})`}}/>
                        <div className=' absolute bottom-0 w-full'>
                    <span className='text-2xl flex flex-col items-center justify-center gap-4 mb-8'>
                      Survival
                      <Button>
                        Dowiedz się więcej
                      </Button>
                    </span>
                        </div>
                      </Card>
                    </div>
                    <div className='w-full' onMouseEnter={() => setHoveredCard(2)}
                         onMouseLeave={() => setHoveredCard(null)}>
                      <Card className='w-full aspect-2/3 relative' style={{aspectRatio: '2/3'}}>
                        <Image src={bushcraftCard} alt='image'
                               className='z-50 w-full rounded-xl absolute transition-all ease-in-out duration-300'
                               style={{transform: `translateY(${hoveredCard === 2 ? '-150px' : '0'}) scale(${hoveredCard === 2 ? '0.95' : '1'})`}}/>
                        <div className=' absolute bottom-0 w-full'>
                    <span className='text-2xl flex flex-col items-center justify-center gap-4 mb-8'>
                      Bushcraft
                      <Button>
                        Dowiedz się więcej
                      </Button>
                    </span>
                        </div>
                      </Card>
                    </div>
                    <div className='w-full' onMouseEnter={() => setHoveredCard(3)}
                         onMouseLeave={() => setHoveredCard(null)}>
                      <Card className='w-full aspect-2/3 relative' style={{aspectRatio: '2/3'}}>
                        <Image src={gamesCard} alt='image'
                               className='z-50 w-full rounded-xl absolute transition-all ease-in-out duration-300'
                               style={{transform: `translateY(${hoveredCard === 3 ? '-150px' : '0'}) scale(${hoveredCard === 3 ? '0.95' : '1'})`}}/>
                        <div className=' absolute bottom-0 w-full'>
                    <span className='text-2xl flex flex-col items-center justify-center gap-4 mb-8'>
                      Gry terenowe
                      <Button>
                        Dowiedz się więcej
                      </Button>
                    </span>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Parallax>
                <Parallax onProgressChange={setAboutTextProgress}>
                  <div className='flex flex-row w-full  bg-opacity-5' style={{
                    opacity: aboutTextProgress < 0.1 ? 0 : (aboutTextProgress - 0.1) * 5,
                    transform: `scale(${aboutTextProgress < 0.1 ? 0.7 : aboutTextProgress > 0.4 ? aboutTextProgress > 0.8 && 1 - (aboutTextProgress - 0.8) : (aboutTextProgress - 0.1) + 0.7})`,
                    filter: `blur(${aboutTextProgress > 0.4 ? 0 : (60 - aboutTextProgress * 150)}px)`,
                  }}>
                    <div className='lg:w-1/2 md:w-1/3 aspect-square flex items-center justify-center'>
                      <Image src={logo} className='md:w-[300px] lg:w-[400px] p-8' alt='logo'/>
                    </div>
                    <div className='lg:w-1/2 md:w-2/3 aspect-square flex items-center justify-center p-8'>
                      <Card>
                        <CardBody className='text-justify'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum id arcu ac sodales.
                          Pellentesque placerat augue nec lorem convallis, sit amet rhoncus turpis blandit. Praesent vel
                          dolor nec ex facilisis laoreet. Quisque ac sapien eget nunc varius consequat. Suspendisse
                          vehicula diam vitae massa pharetra, eget tempor mi porttitor. Sed nisl ante, posuere semper
                          lorem non, semper eleifend justo. Maecenas tempus non lacus bibendum varius. Fusce congue,
                          nibh id rutrum dignissim, sem nunc congue urna, vulputate luctus sem orci eget arcu. Nullam
                          accumsan risus elit, quis volutpat purus posuere et. Donec faucibus odio turpis, vitae
                          molestie justo mattis a. Morbi arcu massa, sodales dignissim massa vel, varius tincidunt
                          velit. Etiam sit amet leo purus. Maecenas ornare magna non lobortis scelerisque. Aliquam
                          condimentum, nunc et viverra scelerisque, lacus lectus porttitor nunc, vehicula fermentum odio
                          nisi a orci.
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </Parallax>
                <div className='flex flex-row w-full relative md:h-[28rem] mt-32' style={{
                  opacity: offroadTitleProgress < 0.1 ? 0 : (offroadTitleProgress - 0.1) * 5,
                  transform: `scale(${offroadTitleProgress < 0.1 ? 0.7 : offroadTitleProgress > 0.4 ? offroadTitleProgress > 0.8 && 1 - (offroadTitleProgress - 0.8) : (offroadTitleProgress - 0.1) + 0.7})`,
                  filter: `blur(${offroadTitleProgress > 0.4 ? 0 : (60 - offroadTitleProgress * 150)}px)`,
                }}>
                  <div className='absolute z-10'>
                    <Parallax translateY={[-12, 15]} onProgressChange={setOffroadTitleProgress}>
                      <Image src={jeepOffroadImage} alt='offroad-jeep' className='w-1/2 m-4 ml-8 z-50'/>
                    </Parallax>
                  </div>
                  <div className='absolute top-28 left-[28rem]'>
                    <Parallax translateX={[-50, 20]}>
                      <div className='text-9xl font-bold text-nowrap'>Off-road</div>
                    </Parallax>
                  </div>
                </div>
                <Parallax onProgressChange={setOffroadDescriptionProgress}>
                  <div className='text-justify mx-12 my-4' style={{
                    opacity: offroadDescriptionProgress < 0.1 ? 0 : (offroadDescriptionProgress - 0.1) * 5,
                    transform: `scale(${offroadDescriptionProgress < 0.1 ? 0.7 : offroadDescriptionProgress > 0.4 ? offroadDescriptionProgress > 0.8 && 1 - (offroadDescriptionProgress - 0.8) : (offroadDescriptionProgress - 0.1) + 0.7})`,
                    filter: `blur(${offroadDescriptionProgress > 0.4 ? 0 : (60 - offroadDescriptionProgress * 150)}px)`,
                  }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum id arcu ac sodales.
                    Pellentesque placerat augue nec lorem convallis, sit amet rhoncus turpis blandit. Praesent vel dolor
                    nec ex facilisis laoreet. Quisque ac sapien eget nunc varius consequat. Suspendisse vehicula diam
                    vitae massa pharetra, eget tempor mi porttitor. Sed nisl ante, posuere semper lorem non, semper
                    eleifend justo. Maecenas tempus non lacus bibendum varius. Fusce congue, nibh id rutrum dignissim,
                    sem nunc congue urna, vulputate luctus sem orci eget arcu. Nullam accumsan risus elit, quis volutpat
                    purus posuere et. Donec faucibus odio turpis, vitae molestie justo mattis a. Morbi arcu massa,
                    sodales dignissim massa vel, varius tincidunt velit. Etiam sit amet leo purus. Maecenas ornare magna
                    non lobortis scelerisque. Aliquam condimentum, nunc et viverra scelerisque, lacus lectus porttitor
                    nunc, vehicula fermentum odio nisi a orci.
                    Aliquam fermentum lorem justo, nec porta mi luctus id. Nulla non libero eu risus sodales rutrum
                    porta varius neque. Vivamus fermentum tempus enim et varius. Pellentesque ut dictum ligula. Integer
                    malesuada dui tincidunt consequat condimentum. Mauris dictum dictum ipsum, fringilla ornare ex
                    lacinia quis. Ut id mi a purus porta mollis sit amet in lorem. Quisque hendrerit cursus ex a
                    euismod. Donec vel odio sollicitudin, cursus erat vitae, semper purus. Integer quis dapibus augue.
                  </div>
                </Parallax>
              </div>
              <div className='relative'>
                <Parallax>
                  <Image src={jungleBg} alt='asd'/>
                </Parallax>
                <div className='absolute top-12 left-1/2 transform -translate-x-1/2'>
                  <Parallax>
                    <div className='text-9xl font-bold text-nowrap  shadow-lg shadow-black bg-white bg-opacity-30 backdrop-blur-xl p-2 rounded-2xl'>SURVIVAL</div>
                  </Parallax>
                </div>
              </div>
            </div>

          </ParallaxProvider>
        </div>
      </div>
    </>
  );
}