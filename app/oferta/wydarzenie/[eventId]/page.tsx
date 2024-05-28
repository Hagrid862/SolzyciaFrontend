'use client';

import React, {useEffect, useState} from "react";
import {useOfferStore} from "@/store/offerStore";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";
import {DateTimeFormat} from "@formatjs/ecma402-abstract";

export default function OfferProductPage({params}: {params: {eventId: string}}) {
  const [event, setEvent] = useState<any>(null);
  const [currentPhoto, setCurrentPhoto] = useState<number>(0);

  const store = useOfferStore();

  const formatDate = (date: string) => {
    const newDate = new Date(date); // use the date passed to the function

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC' // specify the timezone
    };

    const formattedDate = newDate.toLocaleDateString('pl-PL', options);
    return formattedDate.replace(',', ' -'); // return the formatted date
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await store.fetchEventById(params.eventId);
      if (response.isSuccess) {
        setEvent(response.event);
      }
    }

    fetchProduct();
  }, [])

  return (
    <div className='max-w-[1300px] mx-auto mt-2'>
      <div className='flex flex-row gap-8'>
        <Card className='relative w-[550px] max-w-[50vw] aspect-square overflow-visible ml-6'>
          <CardBody className='overflow-visible w-full'>
            {
              event?.images == undefined || event?.images?.length < 1 ? (
                <div className='bg-white max-w-[50vw] max-h-[50vw] w-[525px] h-[525px] flex items-center justify-center flex-row bg-opacity-10 rounded-lg'>
                  <MaterialSymbol icon='no_photography' size={72} color='primary'/>
                </div>
              ) : (
                <div
                  className='max-w-[50vw] max-h-[50vw] w-[525px] h-[525px] flex items-center justify-center flex-row'>
                  <Button isIconOnly className='z-50 absolute left-0 top-1/2 h-16 transform -translate-x-1/2 -translate-y-1/2' color='primary' variant='shadow' isDisabled={currentPhoto < 1}>
                    <MaterialSymbol icon={'arrow_back_ios_new'}/>
                  </Button>
                  <Button isIconOnly className='z-50 absolute right-0 top-1/2 h-16 transform translate-x-1/2 -translate-y-1/2' color='primary' variant='shadow' isDisabled={currentPhoto >= event?.images?.length - 1}>
                    <MaterialSymbol icon={'arrow_forward_ios'}/>
                  </Button>
                  <Image src={event?.images ? event?.images[0] : ''} alt={event?.name}
                         className='max-h-[min(525px, 50vw)] max-w-[min(525px, 50vw)]'/>
                </div>
              )
            }
          </CardBody>
          <Divider/>
          <CardBody>
            <div className='flex flex-row overflow-x-auto'>
              {
                event?.images && event.images.length > 0 ? event.images.map((image: string, index: number) => (
                  <div className='relative h-[75px] flex flex-col items-center justify-center'>
                    <Image src={image} alt={event.name} className={`max-w-[75px] max-h-[75px] rounded-lg scale-${currentPhoto === index ? '100' : '80'}`}/>
                  </div>
                )) : (
                  <div className='h-[75px] text-3xl flex items-center justify-center w-full'>
                    Brak zdjęć
                  </div>
                )
              }
            </div>
          </CardBody>
        </Card>
        <Card className='w-full mr-6 flex flex-col items-start justify-start'>
          <CardBody className='min-h-16 h-16 overflow-hidden'>
            <div className='flex flex-row justify-between relative'>
              <div className='text-3xl font-semibold'>
                {event?.name}
              </div>
              <div className='text-3xl font-bold text-white bg-primary bg-opacity-50 p-4 absolute -right-4 -top-4 flex flex-row'>
                {event?.price} zł
              </div>
            </div>
          </CardBody>
          <Divider/>
          <CardBody className='h-64'>
            <div className='text-2xl font-medium'>Dostępne terminy:</div>
            {
              event?.dates?.map((date: any, index: number) => (
                <>
                  <div key={index} className='flex flex-row justify-between m-2'>
                    <div className='text-lg'>{formatDate(date.date)}</div>
                    <div
                      className='text-lg'>{date.seats} {date.seats === 0 ? 'dostępnych miejsc' : date.seats === 1 ? 'dostępne miejsce' : date.seats > 1 && date.seats < 5 ? 'dostępne miejsca' : 'dostępnych miejsc'}</div>
                  </div>
                  <Divider/>
                </>
              ))
            }
          </CardBody>
          <Divider/>
          <CardBody className='h-full'>
            <div className='text-2xl font-medium'>Opis:</div>
            <div className='text-lg'>{event?.description}</div>
          </CardBody>
          <Divider/>
          <CardBody className='flex flex-row min-h-16 justify-between gap-2'>
            <div className='flex flex-row gap-2'>
              <Button color='warning' variant='flat' isIconOnly>
                <MaterialSymbol icon='email' size={24} color='white'/>
              </Button>
              <Button color='success' variant='flat' isIconOnly>
                <MaterialSymbol icon='favorite' size={24} color='white'/>
              </Button>
              <Button color='secondary' variant='flat' isIconOnly>
                <MaterialSymbol icon='share' size={24} color='white'/>
              </Button>
            </div>
            <div className='gap-2 flex flex-row'>
              <Button color='secondary' variant='solid' isIconOnly>
                <MaterialSymbol icon='add_shopping_cart' size={24} color='white'/>
              </Button>
              <Button color='primary' variant='solid'>
                <MaterialSymbol icon='event_available' size={24} color='white'/>
                Zarezerwuj
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}