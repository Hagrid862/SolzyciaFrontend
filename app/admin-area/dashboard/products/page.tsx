'use client'

import { Card, CardBody, Divider, Image, Link, Tab, Tabs } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAdminStore } from '@/store/adminStore'

export default function ProductsPage() {
  const router = useRouter()

  const products = useAdminStore((state) => state.products)
  const events = useAdminStore((state) => state.events)
  const fetchProducts = useAdminStore((state) => state.fetchProducts)
  const fetchEvents = useAdminStore((state) => state.fetchEvents)

  const [tab, setTab] = useState(0)

  useEffect(() => {
    fetchProducts().then(() => console.log(products))
    fetchEvents().then(() => console.log(events))
    console.log(tab)
  }, [])

  useEffect(() => {
    console.log(events)
  }, [events])

  return (
    <div className='flex flex-col gap-4'>
      <Card
        onClick={() => router.push('products/add')}
        shadow='sm'
        className='w-full h-[64px] flex flex-row bg-white bg-opacity-5'
        isPressable
      >
        <CardBody className='max-w-[80px] bg-primary bg-opacity-15'>
          <div className='w-full flex items-center justify-center'>
            <MaterialSymbol icon={'add_shopping_cart'} size={40} color='#006FEE' />
          </div>
        </CardBody>
        <Divider orientation='vertical' className='h-[64px]' />
        <CardBody className='flex flex-row items-center h-full'>
          <div className='text-2xl font-medium'>Dodaj produkt</div>
        </CardBody>
      </Card>
      <Divider />
      <Tabs
        fullWidth
        onSelectionChange={(k) => {
          setTab(k as number)
          console.log(tab)
        }}
        selectedKey={tab}
      >
        <Tab title='Przedmioty' key={0} />
        <Tab title='Wydarzenia' key={1} />
        <Tab title='Archiwum' key={2} />
      </Tabs>
      <Divider />
      <div className='flex flex-row justify-stretch flex-wrap gap-2'>
        {products[0] === 'loading' ? (
          'Ładowanie...'
        ) : products[0] === 'none' ? (
          'Brak produktów'
        ) : products[0] === 'error' ? (
          'Błąd'
        ) : (
          <>
            {tab == 0
              ? products.map((product: any) => {
                  return (
                    <Card
                      key={product.id}
                      className='w-full sm:w-[calc(50%-0.35rem)] md:w-[calc(100%/3-0.35rem)]  min-w-[150px] md:max-w-[200px] bg-white bg-opacity-5 overflow-x-hidden'
                      isPressable
                      onPress={() => router.push(`products/${product.id}`)}
                    >
                      <CardBody>
                        {product.images && product.images.length > 0 ? (
                          <Image
                            radius='sm'
                            src={product.images[0]}
                            height={200}
                            alt={product.images[0]}
                            className='w-full aspect-square object-cover'
                          />
                        ) : (
                          <div className='w-full aspect-square bg-primary bg-opacity-15 flex items-center justify-center rounded-lg'>
                            <MaterialSymbol icon={'no_photography'} size={40} color='#006FEE' />
                          </div>
                        )}
                      </CardBody>
                      <Divider />
                      <CardBody className='flex flex-col items-start'>
                        <div className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-full'>
                          {product.name}
                        </div>
                        <div className='text-sm bg-primary bg-opacity-20 px-1 text-primary mt-1 rounded-md'>
                          {product.price} zł
                        </div>
                      </CardBody>
                    </Card>
                  )
                })
              : null}
            {tab == 1
              ? events.map((event: any) => {
                  return (
                    <Card
                      key={event.id}
                      className='w-full sm:w-[calc(50%-0.35rem)] md:w-[calc(100%/3-0.35rem)]  min-w-[150px] md:max-w-[200px] bg-white bg-opacity-5 overflow-x-hidden'
                      isPressable
                      onPress={() => router.push(`products/${event.id}`)}
                    >
                      <CardBody>
                        {event.images && event.images.length > 0 ? (
                          <Image
                            radius='sm'
                            src={event.images[0]}
                            height={200}
                            alt={event.images[0]}
                            className='w-full aspect-square object-cover'
                          />
                        ) : (
                          <div className='w-full aspect-square bg-primary bg-opacity-15 flex items-center justify-center rounded-lg'>
                            <MaterialSymbol icon={'no_photography'} size={40} color='#006FEE' />
                          </div>
                        )}
                      </CardBody>
                      <Divider />
                      <CardBody className='flex flex-col items-start'>
                        <div className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-full'>
                          {event.name}
                        </div>
                        <div className='text-sm bg-primary bg-opacity-20 px-1 text-primary mt-1 rounded-md'>
                          {event.price} zł
                        </div>
                      </CardBody>
                    </Card>
                  )
                })
              : null}
          </>
        )}
      </div>
    </div>
  )
}
