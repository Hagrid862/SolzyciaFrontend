import { Card, CardBody, Divider } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'

export default function contactPage() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[800px] mt-12 flex flex-col gap-4 md:min-h-[calc(100vh-64px-7rem)]'>
        <div className='flex flex-row gap-4 items-center'>
          <Card radius='lg'>
            <CardBody>
              <MaterialSymbol icon='smartphone' size={48} />
            </CardBody>
          </Card>
          <div>
            <div className='font-medium opacity-70'>Telefon</div>
            <div className='text-2xl font-semibold'>+48 123 123 123</div>
          </div>
        </div>
        <div className='flex flex-row gap-4 items-center'>
          <Card radius='lg'>
            <CardBody>
              <MaterialSymbol icon='mail' size={48} />
            </CardBody>
          </Card>
          <div>
            <div className='font-medium opacity-70'>E-mail</div>
            <div className='text-2xl font-semibold'>kontakt@solzycia.pl</div>
          </div>
        </div>
        <div className='flex flex-row gap-4 items-center'>
          <Card radius='lg'>
            <CardBody>
              <MaterialSymbol icon='message' size={48} />
            </CardBody>
          </Card>
          <div>
            <div className='font-medium opacity-70'>Instagram</div>
            <div className='text-2xl font-semibold'>@solzycia.pomorze</div>
          </div>
        </div>
        <div className='flex flex-row gap-4 items-center'>
          <Card radius='lg'>
            <CardBody>
              <MaterialSymbol icon='location_on' size={48} />
            </CardBody>
          </Card>
          <div>
            <div className='font-medium opacity-70'>Adres</div>
            <div className='text-2xl font-semibold'>ul. Przykładowa 123, 12-345 Gdańsk</div>
          </div>
        </div>
        <Divider />
        <div>
          <div className='w-full text-center text-4xl font-semibold mb-4'>Mapa</div>
          <div className='w-full h-96 rounded-lg overflow-hidden'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2345.973488266798!2d18.58087031568458!3d54.3777409804978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd747b3f4f5c7f%3A0x1e4e2c7f2c1f6c1a!2sGda%C5%84sk!5e0!3m2!1spl!2spl!4v1633617322140!5m2!1spl!2spl'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
            />
          </div>
        </div>
      </div>
      <div className='w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center mt-4'>
        <div className='w-full max-w-[1400px] mx-4'>Solzycia.pl | &#169; all rights reserved | +48 123 123 123 |</div>
      </div>
    </div>
  )
}
