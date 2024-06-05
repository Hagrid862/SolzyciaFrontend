'use client'

import { Order } from '@/models/Order'
import { Product } from '@/models/Product'
import { Event } from '@/models/Event'
import { useOrderStore } from '@/store/orderStore'
import { Button, Card, CardBody, Divider } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MaterialSymbol } from 'react-material-symbols'

export default function Page({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [status, setStatus] = useState<string>('loading')
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [products, setProducts] = useState<Product[] | null>(null)
  const [events, setEvents] = useState<Event[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const store = useOrderStore()

  useEffect(() => {
    store.getOrder(params.orderId).then((response) => {
      if (response.isSuccess && response.order) {
        setOrder(response.order)
        setStatus('success')
        console.log(response.order)
      } else {
        setStatus(response.status.toLowerCase())
      }
    })
    store.getOrderProducts(params.orderId).then((response) => {
      if (response.isSuccess) {
        setProducts(response.products as Product[])
        setEvents(response.events as Event[])

        let price = 0
        response.products.forEach((product) => {
          price += product.Price
        })
        response.events.forEach((event) => {
          price += event.Price
        })
        setTotalPrice(price)
        return
      }
      setStatus('error')
      return
    })
  }, [])

  return (
    <div className='mx-2'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && order && (
        <div className='max-w-[1200px] w-[h-[calc(100vw-1rem)]] mx-auto mt-2 flex flex-col gap-2'>
          <div className='text-4xl font-semibold mx-auto my-2'>Sfinalizuj zamówienie</div>
          <Card>
            <CardBody className='flex flex-row justify-around'>
              <div
                className={`flex flex-col items-center gap-2 rounded-xl ${currentStep === 0 ? 'text-primary' : 'text-white'}`}
              >
                <MaterialSymbol icon='badge' fill={currentStep === 0} size={48} />
                <div>Twoje dane</div>
              </div>
              <div
                className={`flex flex-col items-center gap-2 rounded-xl ${currentStep === 1 ? 'text-primary' : 'text-white'}`}
              >
                <MaterialSymbol icon='package_2' fill={currentStep === 1} size={48} />
                <div>Dostawa / Odbiór</div>
              </div>
              <div
                className={`flex flex-col items-center gap-2 rounded-xl ${currentStep === 2 ? 'text-primary' : 'text-white'}`}
              >
                <MaterialSymbol icon='payments' fill={currentStep === 2} size={48} />
                <div>Płatność</div>
              </div>
              <div
                className={`flex flex-col items-center gap-2 rounded-xl ${currentStep === 3 ? 'text-primary' : 'text-white'}`}
              >
                <MaterialSymbol icon='check_circle' fill={currentStep === 3} size={48} />
                <div>Potwierdzenie</div>
              </div>
            </CardBody>
          </Card>
          <Divider />
          {currentStep === 0 && (
            <Card className='flex flex-row h-[calc(100vh-346px)]'>
              <CardBody className='w-[65%]'>form</CardBody>
              <Divider orientation='vertical' className='h-full' />
              <CardBody className='w-[35%] justify-between flex flex-col'>
                {products !== null && events !== null && (
                  <div>
                    {products.length > 0 && (
                      <>
                        <div>Produkty</div>
                        <Divider />
                        {products.map((product, index) => (
                          <div className='text-sm' key={index}>
                            <div className='flex flex-row justify-between items-center my-1'>
                              <div className='text-lg'>{product.Name}</div>
                              <div className='text-md text-primary'>{product.Price} zł</div>
                            </div>
                            <Divider/>
                          </div>
                        ))}
                      </>
                    )}
                    {events.length > 0 && (
                      <>
                        <div className='text-xl mb-1'>Wydarzenia</div>
                        <Divider />
                        {events.map((event, index) => (
                          <div className='text-sm' key={index}>
                            <div className='flex flex-row justify-between items-center my-1'>
                              <div className='text-lg'>{event.Name}</div>
                              <div className='text-md text-primary'>{event.Price} zł</div>
                            </div>
                            <Divider/>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
                <div>
                  <Divider/>
                  <div className='text-2xl mt-2'>Suma: {totalPrice} zł</div>
                  <Button
                    onPress={() => {
                      setCurrentStep(1)
                    }}
                    color='primary'
                    className='w-full mt-2'
                  >
                    Dalej
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
      {status === 'notfound' && <p>Order not found</p>}
      {status === 'error' && <p>Error</p>}
    </div>
  )
}
