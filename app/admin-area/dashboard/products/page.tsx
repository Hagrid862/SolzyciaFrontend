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
    fetchProducts()
    fetchEvents()
  }, [])

  useEffect(() => {}, [events])

  useEffect(() => {}, [tab])

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
        }}
        selectedKey={tab}
      >
        <Tab title='Przedmioty' key={0} />
        <Tab title='Wydarzenia' key={1} />
        <Tab title='Archiwum' key={2} />
      </Tabs>
      <Divider />
      <div className='flex flex-row w-full justify-stretch flex-wrap gap-2'>
        {tab == 0 && (
          <>
            {products[0] === 'loading' && 'Ładowanie...'}
            {products[0] === 'none' && 'Brak produktów'}
            {products[0] === 'error' && 'Błąd'}
            {products[0] !== 'none' &&
              products[0] !== 'error' &&
              products[0] !== 'loading' &&
              products.map((product: any) => {
                return (
                  <Card
                    key={product.Id}
                    className='w-full sm:w-[calc(50%-0.35rem)] md:w-[calc(100%/3-0.35rem)]  min-w-[150px] md:max-w-[200px] bg-white bg-opacity-5 overflow-x-hidden'
                    isPressable
                    onPress={() => router.push(`products/view?id=${product.Id}&type=product`)}                >
                    <CardBody>
                      {product.Images && product.Images.length > 0 ? (
                        <Image
                          radius='sm'
                          src={product.Images[0]}
                          height={200}
                          alt={product.Images[0]}
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
                        {product.Name}
                      </div>
                      <div className='text-sm bg-primary bg-opacity-20 px-1 text-primary mt-1 rounded-md'>
                        {product.Price} zł
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
          </>
        )}

        {tab == 1 && (
          <>
            {events[0] === 'loading' && 'Ładowanie...'}
            {events[0] === 'none' && 'Brak wydarzeń'}
            {events[0] === 'error' && 'Błąd'}
            {events[0] !== 'none' &&
              events[0] !== 'error' &&
              events[0] !== 'loading' &&
              events.map((event: any) => {
                return (
                  <Card
                    key={event.Id}
                    className='w-full sm:w-[calc(50%-0.35rem)] md:w-[calc(100%/3-0.35rem)]  min-w-[150px] md:max-w-[200px] bg-white bg-opacity-5 overflow-x-hidden'
                    isPressable
                    onPress={() => router.push(`products/view?id=${event.Id};type=event`)}
                  >
                    <CardBody>
                      {event.Images && event.Images.length > 0 ? (
                        <Image
                          radius='sm'
                          src={event.Images[0]}
                          height={200}
                          alt={event.Images[0]}
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
                        {event.Name}
                      </div>
                      <div className='text-sm bg-primary bg-opacity-20 px-1 text-primary mt-1 rounded-md'>
                        {event.Price} zł
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
          </>
        )}
      </div>
    </div>
  )
}
