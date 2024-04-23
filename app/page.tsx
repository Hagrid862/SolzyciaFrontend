import {Button} from '@nextui-org/button';
import {Textarea} from "@nextui-org/input";
import Image from "next/image";
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import cover from '@/assets/images/cover.jpg'
import converVertical from '@/assets/images/cover-vertical.jpeg'
import logo from '@/assets/images/logo.png'
import bushcraft from '@/assets/images/oferta/bushcraft.jpeg'
import offRoad from '@/assets/images/oferta/off-road.jpg'
import orientacja from '@/assets/images/oferta/orientacja.jpeg'
import survival from '@/assets/images/oferta/survival.jpg'


export default function Home() {
  return (
      <main>
        <div className='w-screen flex items-center justify-center relative'>
          <Image src={cover} alt='cover' className='mt-4 rounded-xl md:h-auto h-screen hidden md:block' priority/>
          <Image src={converVertical} alt='cover' className='mt-4 rounded-xl md:h-auto h-screen w-[300%] block md:hidden' priority/>
          <div className='absolute  right-8'>
            <div className='text-5xl font-bold'>Przejazdy Off-Road</div>
            <div className='text-xl text-right'>Na terenie pomorza</div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap md:flex-nowrap items-center justify-center mb-24'>
          <Image src={logo} alt='Logo' className='invert md:w-1/3 md:ml-[5%] w-[75vw] mb-8 md:mb-0 max-w-[250px]'/>
          <Card className='w-full ml-4 md:ml-8 mr-4 max-w-[600px]'>
            <CardHeader>
              <div className='text-2xl'>Z nami możliwości stają się realne</div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <p className='text-justify'>
                Jesteśmy pasjonatami mocnych wrażeń i dobrej zabawy. Naszą specjalizacją są Eventy Firmowe oraz Imprezy Integracyjne o tematyce ekstremalnej, survivalowej i outdoorowej. Pomimo, że jest to nasza ulubiona tematyka, jesteśmy również świetni w organizacji bankietów, szkoleń jak i wyjazdów integracyjnych. WSZYSTKIE ATRAKCJE W JEDNEJ LOKALIZACJI! Zapoznaj się z naszą ofertą i skontaktuj się z nami już dziś!
              </p>
            </CardBody>
          </Card>
        </div>
        <div className='ml-12 mr-12'>
          <div className='text-4xl'>Oferta</div>
          <Divider/>
          <div className='flex flex-row flex-nowrap overflow-x-auto mt-2 gap-2'>
            <Card className='w-[170px]'>
              <CardBody>
                <Image src={offRoad} alt='offRoad' className='rounded-lg' width={170}/>
                <div className='text-2xl mt-2'>Off-Road</div>
              </CardBody>
            </Card>
            <Card className='w-[170px]'>
              <CardBody>
                <Image src={bushcraft} alt='bushcraft' className='rounded-lg' width={170}/>
                <div className='text-2xl mt-2'>Bushcraft</div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
  );
}
