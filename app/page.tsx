'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
import { Button, Card, CardBody } from '@heroui/react'
import { MaterialSymbol } from 'react-material-symbols'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <>
      <div className='w-full max-w-screen flex-col items-center flex'>
        <div className='w-full h-[calc(100vh-64px)] relative'>
          <Image src={cover1} alt='cover' layout='fill' objectFit='cover' className='absolute opacity-75'/>
          <div className='absolute top-1/2 transform -translate-y-1/2 left-12'>
            <h1 className='text-white text-6xl font-bold'>Sól życia</h1>
            <p className='text-white text-lg'>Twoje wyzwania, nasze pasje.</p>
          </div>
        </div>
        <div className='max-w-[1200px] w-full flex flex-col justify-center items-center my-12 px-4'>
          <div className='text-3xl font-medium mb-4'>Oferta</div>
          <div className='flex flex-col md:flex-row gap-8 mx-8'>
            <div onMouseEnter={() => setHoveredCard(0)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image
                  src={offroadCard}
                  alt='offroad'
                  className={`max-w-[250px] ${hoveredCard === 0 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{transition: '0.3s ease all'}}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 0 ? 'bottom-0' : '-bottom-20'}`}
                  style={{transition: '0.3s ease all'}}
                  onPress={() => router.push('/off-road')}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Off-road</div>
            </div>
            <div onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image
                  src={survivalCard}
                  alt='survival'
                  className={`max-w-[250px] ${hoveredCard === 1 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{transition: '0.3s ease all'}}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 1 ? 'bottom-0' : '-bottom-20'}`}
                  style={{transition: '0.3s ease all'}}
                  onPress={() => router.push('/survival')}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Survival</div>
            </div>
            <div onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image
                  src={bushcraftCard}
                  alt='bushcraft'
                  className={`max-w-[250px] ${hoveredCard === 2 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{transition: '0.3s ease all'}}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 2 ? 'bottom-0' : '-bottom-20'}`}
                  style={{transition: '0.3s ease all'}}
                  onPress={() => router.push('/bushcraft')}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Bushcraft</div>
            </div>
            <div onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
              <Card className='relative items-center max-w-[250px] w-full' style={{aspectRatio: '2/3'}}>
                <Image
                  src={gamesCard}
                  alt='offroad'
                  className={`max-w-[250px] ${hoveredCard === 3 ? 'scale-90 transform -translate-y-16' : 'scale-100 transform translate-y-0'} w-full rounded-xl`}
                  style={{transition: '0.3s ease all'}}
                />
                <Button
                  className={`absolute w-[calc(100%-2rem)] m-4 ${hoveredCard === 3 ? 'bottom-0' : '-bottom-20'}`}
                  style={{transition: '0.3s ease all'}}
                  onClick={() => router.push('/games')}
                >
                  Zobacz więcej
                </Button>
              </Card>
              <div className='text-xl text-center mt-2 font-semibold'>Gry zespołowe</div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row mt-12 w-full items-center'>
            <Image src={logo} alt='logo' className='md:w-1/4 lg:w-1/3 m-12 aspect-square'/>
            <div className='text-justify'>
              Jesteśmy dynamiczną firmą specjalizującą się w organizacji gier zespołowych, kursów survivalowych,
              off-roadu i bushcraftu. Nasza misja to inspirowanie ludzi do odkrywania radości i korzyści płynących z
              aktywności na świeżym powietrzu. Wierzymy, że przygody na łonie natury wzmacniają więzi, rozwijają
              umiejętności przetrwania i promują szacunek do środowiska. Zaczęliśmy jako grupa przyjaciół pasjonujących
              się outdoorowymi wyzwaniami, a teraz z dumą dzielimy się naszym doświadczeniem i wiedzą z innymi. Nasze
              wartości to współpraca, autentyczność i zrównoważony rozwój. Zapewniamy niezapomniane przeżycia, które
              budują społeczność opartą na zaufaniu i wzajemnym wsparciu.
            </div>
          </div>
          <div className='flex flex-col md:flex-row mt-12 items-center justify-center mb-16'>
            <Image src={jeepOffroadImage} alt='off-road-jeep'
                   className='order-first md:order-last md:w-1/3 lg:w-1/3 m-12'/>
            <div>
              <div className='text-3xl font-semibold text-center md:text-right'>Off-road</div>
              <div className='text-justify'>
                Od wielu lat bierzemy udział w rajdach i wyprawach. W końcu zaczęliśmy sami takie imprezy organizować.
                Od samego początku dzieliliśmy naszą pasję z rodziną i znajomymi - towarzyszyli nam wspaniali ludzie
                podczas imprez, rajdów czy na dalekich wyprawach. Od jakiegoś czasu wprowadzamy w świat offroad&apos;u
                również osoby spoza kręgu znajomych - zapraszamy do wspólnej zabawy &quot;w błocie&quot;!
              </div>
              <div className='flex flex-row justify-center mt-4'>
                <Button className='mt-4' color='primary' onClick={() => router.push('/off-road')}>
                  Zobacz więcej
                </Button>
              </div>
            </div>
          </div>
          <div className='flex md:flex-row flex-col gap-4 w-full justify-center items-center'>
            <Image src={knifepng} alt='knife transparent background' className='md:w-1/4 w-3/4 -rotate-90 md:rotate-0 md:mb-0 -mb-24'/>
            <div className='h-full flex flex-col items-center justify-center'>
              <div className='text-3xl font-semibold text-center md:text-left w-full'>Survival</div>
              <div className='text-justify'>
                Od lat młodzieńczych dużo czasu spędzaliśmy poza cywilizacją radząc sobie z minimalnym wyposażeniem za
                to nadrabiając wiedzą i doświadczeniem. Najbardziej komfortowym &quot;wyjściem do lasu&quot; była
                corocznie
                zdobywana sprawność &quot;Trzy pióra&quot; - można powiedzieć że to wyjście do lasu miało &quot;gdzieś
                tam&quot; wsparcie
                logistyczne&quot; chyba że się zgubiliśmy w lesie. Nasze umiejętności nabyte podczas kilku dekad
                pozwalają
                nam na zapewnienie kursantom bezpieczeństwa ale również niezwykłych przeżeżyć!
              </div>
              <div className='flex flex-row justify-center mt-4'>
                <Button className='mt-4' color='primary' onClick={() => router.push('/survival')}>
                  Zobacz więcej
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center'>
          <div className='w-full max-w-[1400px]'>
            Solzycia.pl | &#169; all rights reserved | +48 601 622 442 | sol.zycia@gmail.com
          </div>
        </div>
      </div>
    </>
  );
}
