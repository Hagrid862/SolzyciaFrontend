import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

export default function aboutPage() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1200px] mb-4'>
        <div className='w-full flex flex-col items-center justify-center mt-8 gap-2'>
          <Image src={logo} alt='logo' className='w-1/3 animate-spin-slow duration-[20s]' />
          <div className='mt-6 w-2/3'>
            <h1 className='text-4xl font-bold text-center'>O nas</h1>
            <p className='text-lg text-center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
              eleifend nunc. Nulla ut turpis nec leo ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.
            </p>
          </div>
          <Divider />
          <div>
            <h1 className='text-2xl font-bold'>Nasza historia</h1>
            <p className='text-lg text-left w-2/3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
              eleifend nunc. Nulla ut turpis nec leo ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.
            </p>
          </div>
          <div className='flex flex-col items-end'>
            <h1 className='text-2xl font-bold'>Nasze wartości</h1>
            <p className='text-lg w-2/3 text-right'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
              eleifend nunc. Nulla ut turpis nec leo ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.
            </p>
          </div>
          <div>
            <h1 className='text-2xl font-bold'>Nasza misja</h1>
            <p className='text-lg text-left w-2/3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
              eleifend nunc. Nulla ut turpis nec leo ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla ut turpis nec leo ultricies.
            </p>
          </div>
          <Divider />
          <div className='w-full'>
            <div className='text-center text-4xl font-semibold'>Nasze cele</div>
            <div className='flex mt-4 gap-4 '>
              <Card>
                <CardHeader>
                  <h3 className='text-2xl font-semibold'>Cel 1</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className='text-lg'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    eleifend nunc. Nulla ut turpis nec leo ultricies.
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className='text-2xl font-semibold'>Cel 2</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className='text-lg'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    eleifend nunc. Nulla ut turpis nec leo ultricies.
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className='text-2xl font-semibold'>Cel 3</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className='text-lg'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    eleifend nunc. Nulla ut turpis nec leo ultricies.
                  </p>
                </CardBody>
              </Card>
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
  )
}
