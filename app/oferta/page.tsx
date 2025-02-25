'use client'

import { Card, CardBody } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'
import 'react-material-symbols/rounded'

export default function OfferPage() {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[32rem] h-[18rem]'>
      <Card className='md:flex hidden w-full h-full' radius='lg'>
        <CardBody className='flex items-center justify-center gap-2'>
          <MaterialSymbol icon='construction' size={96} />
          <div className='text-3xl font-semibold'>Strona w budowie</div>
          <div className='text-xl'>Zapraszamy do kontaktu telefonicznego</div>
        </CardBody>
      </Card>
      <Card className='flex md:hidden w-full h-full' radius='lg'>
        <CardBody className='flex items-center justify-center gap-2'>
          <MaterialSymbol icon='construction' size={72} />
          <div className='text-2xl font-semibold'>Strona w budowie</div>
          <div className='text'>Zapraszamy do kontaktu telefonicznego</div>
        </CardBody>
      </Card>
    </div>
  )
}
