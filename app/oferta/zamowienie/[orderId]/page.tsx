'use client'

import { Order } from '@/models/Order'
import { Product } from '@/models/Product'
import { Event } from '@/models/Event'
import { useOrderStore } from '@/store/orderStore'
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MaterialSymbol } from 'react-material-symbols'
import { setegid } from 'process'

export default function Page({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [status, setStatus] = useState<string>('loading')
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [products, setProducts] = useState<Product[] | null>(null)
  const [events, setEvents] = useState<Event[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [eventsDates, setEventsDates] = useState<{ eventId: string; dateId: string }[]>([])

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
            <OrderStep0
              productsProp={products}
              eventsProp={events}
              totalPriceProp={totalPrice}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 1 && (
            <OrderStep1
              productsProp={products}
              eventsProp={events}
              totalPriceProp={totalPrice}
              setCurrentStep={setCurrentStep}
              eventDates={eventsDates}
              changeEventDate={(eventId: string, dateId: string) => {
                if (eventsDates.find((ed) => ed.eventId === eventId)) {
                  setEventsDates((prev) => prev.map((ed) => (ed.eventId === eventId ? { eventId, dateId } : ed)))
                } else {
                  setEventsDates((prev) => [...prev, { eventId, dateId }])
                }
              }}
            />
          )}
        </div>
      )}
      {status === 'notfound' && <p>Order not found</p>}
      {status === 'error' && <p>Error</p>}
    </div>
  )
}

function OrderStep0({
  productsProp,
  eventsProp,
  totalPriceProp,
  setCurrentStep
}: {
  productsProp: Product[] | null
  eventsProp: Event[] | null
  totalPriceProp: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const [name, setName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [invalid, setInvalid] = useState<number[]>([])

  const goNext = () => {
    setInvalid([])
    if (name === '') {
      setInvalid((prev) => [...prev, 1])
    }
    if (lastName === '') {
      setInvalid((prev) => [...prev, 2])
    }
    if (email === '') {
      setInvalid((prev) => [...prev, 3])
    }
    if (phone === '') {
      setInvalid((prev) => [...prev, 4])
    }
    if (name !== '' && lastName !== '' && email !== '' && phone !== '') {
      setCurrentStep(1)
    }
  }

  return (
    <Card className='flex flex-row h-[calc(100vh-346px)]'>
      <CardBody className='w-[65%] flex flex-col gap-2'>
        <div className='text-xl'>Dane osobowe</div>
        <div className='flex flex-row gap-2'>
          <Input
            label='Imie'
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={invalid.includes(1)}
            errorMessage='Pole jest wymagane'
            isRequired
          />
          <Input
            label='Nazwisko'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isInvalid={invalid.includes(2)}
            errorMessage='Pole jest wymagane'
            isRequired
          />
        </div>
        <Divider />
        <div className='text-xl'>Dane kontaktowe</div>
        <div className='flex flex-row gap-2'>
          <Input
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={invalid.includes(3)}
            errorMessage='Pole jest wymagane'
            isRequired
          />
          <Input
            label='Telefon'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={invalid.includes(4)}
            errorMessage='Pole jest wymagane'
            isRequired
          />
        </div>
      </CardBody>
      <Divider orientation='vertical' className='h-full' />
      <CardBody className='w-[35%] justify-between flex flex-col'>
        {productsProp !== null && eventsProp !== null && (
          <div>
            {productsProp.length > 0 && (
              <>
                <div>Produkty</div>
                <Divider />
                {productsProp.map((product, index) => (
                  <div className='text-sm' key={index}>
                    <div className='flex flex-row justify-between items-center my-1'>
                      <div className='text-lg'>{product.Name}</div>
                      <div className='text-md text-primary'>{product.Price} zł</div>
                    </div>
                    <Divider />
                  </div>
                ))}
              </>
            )}
            {eventsProp.length > 0 && (
              <>
                <div className='text-xl mb-1'>Wydarzenia</div>
                <Divider />
                {eventsProp.map((event, index) => (
                  <div className='text-sm' key={index}>
                    <div className='flex flex-row justify-between items-center my-1'>
                      <div className='text-lg'>{event.Name}</div>
                      <div className='text-md text-primary'>{event.Price} zł</div>
                    </div>
                    <Divider />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        <div>
          <Divider />
          <div className='text-2xl mt-2'>Suma: {totalPriceProp} zł</div>
          <Button
            onPress={() => {
              goNext()
            }}
            color='primary'
            className='w-full mt-2'
          >
            Dalej
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

function OrderStep1({
  productsProp,
  eventsProp,
  totalPriceProp,
  eventDates,
  setCurrentStep,
  changeEventDate,
}: {
  productsProp: Product[] | null
  eventsProp: Event[] | null
  totalPriceProp: number
  eventDates: { eventId: string; dateId: string }[],
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  changeEventDate: (eventId: string, dateId: string) => void
}) {
  const [selectedProduct, setSelectedProduct] = useState<Event | Product | null>(
    eventsProp ? eventsProp[0] : productsProp ? productsProp[0] : null
  )

  useEffect(() => {
    if (productsProp && productsProp.length > 0) {
      setSelectedProduct(productsProp[0])
    } else if (eventsProp && eventsProp.length > 0) {
      setSelectedProduct(eventsProp[0])
    } else {
      setSelectedProduct(null)
    }

    console.log(productsProp, eventsProp)
  }, [])

  function formatDate(dateString: string): string {
    const date = new Date(dateString)

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const formattedDate = date.toLocaleDateString('pl-PL', options)

    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    }

    const formattedTime = date.toLocaleTimeString('pl-PL', optionsTime)

    return `${formattedDate} | ${formattedTime}`
  }

  const setDate = (eventId: string, dateId: string) => {
    changeEventDate(eventId, dateId)
  }

  return (
    <Card className='flex flex-col h-[calc(100vh-346px)]'>
      <CardBody className='w-full flex flex-col gap-2'>
        {
          productsProp !== undefined && productsProp !== null && productsProp.length > 0 && (
            <div key='products-container' className='flex flex-col gap-4'>
              <div className='text-xl font-semibold'>Produkty:</div>
              {
                productsProp.map((product, index) => (
                  <div
                    className='flex flex-row justify-between items-center text-sm'
                    key={index}
                  >
                    <div className='text-lg'>{product.Name}</div>
                    <div className='text-md text-primary'>{product.Price} zł</div>
                  </div>
                ))
              }
            </div>
          )
        }
        {
          eventsProp !== undefined && eventsProp !== null && eventsProp.length > 0 && (
            <div key='events-container' className='flex flex-col gap-4'>
              <div className='text-xl font-semibold'>Wydarzenia:</div>
              {
                eventsProp.map((event, index) => (
                  <div key={`event-card-${index}`}>
                    <Card>
                      <CardHeader className='bg-white bg-opacity-5 font-semibold'>
                        {event.Name}
                      </CardHeader>
                      <Divider/>
                      <CardBody className='bg-white bg-opacity-5 flex flex-col gap-2'>
                        <div>Termin rezerwacji:</div>
                        <div className='flex flex-row flex-nowrap max-w-[100%] overflow-x-auto gap-4'>
                        {
                          event.Dates.map((date, index) => (
                            <Card key={`date-${date.Date}`} className={`min-w-[300px] max-w-[300px] ${eventDates.find((eventDate) => eventDate.eventId === event.Id && eventDate.dateId === date.Id) ? 'bg-white bg-opacity-15' : ''}`} isPressable isHoverable={eventDates.find((eventDate) => eventDate.eventId === event.Id && eventDate.dateId === date.Id) == null} onPress={() => {setDate(event.Id, date.Id); console.log(eventDates)}}>
                              <CardHeader>
                                {formatDate(date.Date.toString())}
                              </CardHeader>
                              <Divider/>
                              <CardBody>
                                lokalizacja:
                                {
                                  date.Location?.City && date.Location.HouseNumber && date.Location.Street && date.Location.PostalCode ? (
                                    <div>
                                      {date.Location?.Street}/{date.Location?.HouseNumber}, {date.Location?.City}
                                    </div>
                                  ) : ( 
                                    <>
                                      <div>
                                        Brak informacji.
                                      </div> 
                                      <div className='text-xs'>
                                        Skontaktuj sie z nami po wiecej informacji
                                      </div>
                                    </>
                                  )
                                }
                              </CardBody>
                            </Card>
                          ))
                        }
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))
              }
            </div>
          )
        }
      </CardBody>
      <Divider/>
      <CardBody className='flex flex-row gap-2 overflow-hidden'>
        <Button isIconOnly>
          <MaterialSymbol icon={'arrow_back_ios_new'} size={24} />
        </Button>
        <Button color='primary' className='w-full'>
          Dalej
        </Button>
      </CardBody>
    </Card>
  )
}
