'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { MaterialSymbol } from 'react-material-symbols';

export default function ViewProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-4'>
      <Card className='bg-white bg-opacity-5' shadow='sm'>
        <CardBody className='flex flex-row gap-2'>
          <Button isIconOnly color='secondary' variant='faded' onClick={() => router.push('/admin-area/dashboard/products')}>
            <MaterialSymbol icon='arrow_back' size={24} />
          </Button>
          <Button isIconOnly color='primary' variant='faded'>
            <MaterialSymbol icon='edit' size={24} />
          </Button>
        </CardBody>
      </Card>
      {children}
    </div>
  )
}