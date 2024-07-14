'use client'

import React, { useEffect, useState } from 'react'
import { useOfferStore } from '@/store/offerStore'
import { Button, Card, CardBody, CardHeader, Divider, Image, Tooltip } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'
import { DateTimeFormat } from '@formatjs/ecma402-abstract'
import { useCartStore } from '@/store/cartStore'
import { Event } from '@/models/Event'
import { EventDate } from '@/models/EventDate'
import { Image as ImageModel } from '@/models/Image'

export default function OfferProductPage({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [currentPhoto, setCurrentPhoto] = useState<number>(0)

  const store = useOfferStore()
  const cartStore = useCartStore()

  const formatDate = (date: string) => {
    const newDate = new Date(date) // use the date passed to the function

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC' // specify the timezone
    }

    const formattedDate = newDate.toLocaleDateString('pl-PL', options)
    return formattedDate.replace(',', ' -') // return the formatted date
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await store.fetchEventById(params.eventId)
      if (response.isSuccess) {
        setEvent(response.event)
      }
    }

    fetchProduct()
  }, [])

  const addToCart = () => {
    cartStore.addToCart(params.eventId, true)
  }

  return (
    <div className='max-w-[1300px] mx-auto mt-2'>
      <div className='flex flex-row gap-8'>
        <Card className='relative w-[550px] max-w-[50vw] aspect-square overflow-visible ml-6'>
          <CardBody className='overflow-visible w-full'>
            {event?.Images == undefined || event?.Images?.length < 1 ? (
              <div className='bg-white max-w-[50vw] max-h-[50vw] w-[525px] h-[525px] flex items-center justify-center flex-row bg-opacity-10 rounded-lg'>
                <MaterialSymbol icon='no_photography' size={72} color='primary' />
              </div>
            ) : (
              <div className='max-w-[50vw] max-h-[50vw] w-[525px] h-[525px] flex items-center justify-center flex-row'>
                <Button
                  isIconOnly
                  className='z-50 absolute left-0 top-1/2 h-16 transform -translate-x-1/2 -translate-y-1/2'
                  color='primary'
                  variant='shadow'
                  isDisabled={currentPhoto < 1}
                >
                  <MaterialSymbol icon={'arrow_back_ios_new'} />
                </Button>
                <Button
                  isIconOnly
                  className='z-50 absolute right-0 top-1/2 h-16 transform translate-x-1/2 -translate-y-1/2'
                  color='primary'
                  variant='shadow'
                  isDisabled={currentPhoto >= (event?.Images?.length ?? 0) - 1}
                >
                  <MaterialSymbol icon={'arrow_forward_ios'} />
                </Button>
                <Image
                  src={event?.Images ? event?.Images[0].Base64 : ''}
                  alt={event?.Name}
                  className='max-h-[min(525px, 50vw)] max-w-[min(525px, 50vw)]'
                />
              </div>
            )}
          </CardBody>
          <Divider />
          <CardBody>
            <div className='flex flex-row overflow-x-auto'>
              {event?.Images && event?.Images?.length > 0 ? (
                event?.Images?.map((image: ImageModel, index: number) => (
                  <div className='relative h-[75px] flex flex-col items-center justify-center' key='event-photo'>
                    <Image
                      src={image.Base64}
                      alt={event.Name}
                      className={`max-w-[75px] max-h-[75px] rounded-lg scale-${currentPhoto === index ? '100' : '80'}`}
                    />
                  </div>
                ))
              ) : (
                <div className='h-[75px] text-3xl flex items-center justify-center w-full'>Brak zdjęć</div>
              )}
            </div>
          </CardBody>
        </Card>
        <Card className='w-full mr-6 flex flex-col items-start justify-start'>
          <CardBody className='min-h-16 h-16 overflow-hidden'>
            <div className='flex flex-row justify-between relative'>
              <div className='text-3xl font-semibold'>{event?.Name}</div>
              <div className='text-3xl font-bold text-white bg-primary bg-opacity-50 p-4 absolute -right-4 -top-4 flex flex-row'>
                {event?.Price} zł
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardBody className='h-64'>
            <div className='text-2xl font-medium'>Dostępne terminy:</div>
            {event?.Dates?.map((date: EventDate, index: number) => (
              <>
                <div key={index} className='flex flex-row justify-between m-2'>
                  <div className='text-lg'>{formatDate(date.Date.toString())}</div>
                  <div className='text-lg'>
                    {date.Seats}{' '}
                    {date.Seats === 0
                      ? 'dostępnych miejsc'
                      : date.Seats === 1
                        ? 'dostępne miejsce'
                        : date.Seats > 1 && date.Seats < 5
                          ? 'dostępne miejsca'
                          : 'dostępnych miejsc'}
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </CardBody>
          <Divider />
          <CardBody className='h-full gap-2'>
            <Card>
              <CardBody className='bg-white bg-opacity-5'>
                <div className='text-2xl font-medium'>
                  Czas trwania:{' '}
                  {event?.Time && event?.Time >= 60
                    ? event?.Time / 60 == 1
                      ? '1 godzina'
                      : event?.Time > 1 && event?.Time < 5
                        ? `${event?.Time / 60} godziny`
                        : `${event?.Time / 60} godzin`
                    : `${event?.Time} minut`}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className='bg-white bg-opacity-5'>
                <div className='text-2xl font-medium'>Opis:</div>
                <div className='text-lg'>{event?.Description}</div>
              </CardBody>
            </Card>
          </CardBody>
          <Divider />
          <CardBody className='flex flex-row min-h-16 justify-between gap-2'>
            <div className='flex flex-row gap-2'>
              <Tooltip content='Kontakt' placement='bottom'>
                <Button color='primary' variant='flat' isIconOnly>
                  <MaterialSymbol icon='call' size={24} color='white' />
                </Button>
              </Tooltip>
              <Tooltip content='Polub' placement='bottom'>
                <Button color='success' variant='flat' isIconOnly>
                  <MaterialSymbol icon='favorite' size={24} color='white' />
                </Button>
              </Tooltip>
              <Tooltip content='Udostępnij' placement='bottom'>
                <Button color='secondary' variant='flat' isIconOnly>
                  <MaterialSymbol icon='share' size={24} color='white' />
                </Button>
              </Tooltip>
            </div>
            <div className='gap-2 flex flex-row'>
              <Tooltip content='Dodaj do koszyka' placement='bottom'>
                <Button color='secondary' variant='solid' isIconOnly onClick={() => addToCart()}>
                  <MaterialSymbol icon='add_shopping_cart' size={24} color='white' />
                </Button>
              </Tooltip>
              <Button color='primary' variant='solid'>
                <MaterialSymbol icon='event_available' size={24} color='white' />
                Zarezerwuj
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card className='m-6'>
        <CardHeader className='flex flex-row justify-between'>
          <span className='text-xl font-semibold'>Opinie innych</span>
          <div className='text-lg text-white text-opacity-50'>21 opinii</div>
        </CardHeader>
        <Divider />
        <div className='flex flex-row h-64'>
          <CardBody className='w-4/6 flex flex-col gap-2'>
            <Card className=' min-h-48 max-h-48 bg-white bg-opacity-5'>
              <CardHeader className='flex flex-row justify-between'>
                <div className='text-2xl font-medium'>Grayna123</div>
                <div className='relative'>
                  <div className='flex flex-row'>
                    <MaterialSymbol icon='star' size={32} />
                    <MaterialSymbol icon='star' size={32} />
                    <MaterialSymbol icon='star' size={32} />
                    <MaterialSymbol icon='star' size={32} />
                    <MaterialSymbol icon='star' size={32} />
                  </div>
                  <div className='flex flex-row top-0 absolute'>
                    <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                    <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                    <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                    <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                eleifend mi, non fermentum diam nisl sit amet erat. Duis semper.
              </CardBody>
            </Card>
            <Button color='primary' variant='flat' className='w-full'>
              Pokaż wszystkie opinie
            </Button>
          </CardBody>
          <Divider className='h-64' orientation='vertical' />
          <CardBody className='w-2/6'>
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='relative'>
                <div className='flex flex-row'>
                  <MaterialSymbol icon='star' size={32} />
                  <MaterialSymbol icon='star' size={32} />
                  <MaterialSymbol icon='star' size={32} />
                  <MaterialSymbol icon='star' size={32} />
                  <MaterialSymbol icon='star' size={32} />
                </div>
                <div className='flex flex-row top-0 absolute'>
                  <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                  <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                  <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                  <MaterialSymbol icon='star' size={32} fill color='#F7B750' />
                  <MaterialSymbol icon='star' size={32} fill color='#F7B750' className='w-[16px] overflow-hidden' />
                </div>
              </div>
              <div>Średnia ocen:</div>
              <div className='text-2xl'>4.5 / 5</div>
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  )
}
