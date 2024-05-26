'use client';

import {useOfferStore} from "@/store/offerStore";
import {useEffect, useState} from "react";
import {Card, CardBody, Chip, Divider, Image, Spinner} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  const fetchProducts = useOfferStore((state) => state.fetchProducts);
  const fetchEvents = useOfferStore((state) => state.fetchEvents);
  const products = useOfferStore((state) => state.products);
  const events = useOfferStore((state) => state.events);

  const filterType = useOfferStore((state) => state.filterType);

  useEffect(() => {
    fetchProducts();
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(events);
  }, [products, events]);

  return (
      <main className='p-2 flex items-center justify-start flex-col'>
        <div className='sm:grid grid-cols-1 gap-4 md:flex md:flex-col w-[1200px] max-w-[calc(100vw-1rem)]'>
          {products[0] === 'loading' && filterType === 'products' || events[0] === 'loading' && filterType === 'events' ? <div className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Spinner size='lg'/>
          </div>: null}
          {filterType === 'products' && products[0] === 'none' ? <div>
            <Card className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[250px] max-w-1/2'>
              <CardBody className='items-center'>
                <MaterialSymbol icon={'error'} size={72} className='text-warning'/>
              </CardBody>
              <Divider/>
              <CardBody className='text-center'>
                <div className='text-2xl font-semibold'>Brak produktów</div>
                <div className='text-lg text-gray-500'>Nie znaleziono produktów pasujących do wybranych filtrów.</div>
              </CardBody>
            </Card>
          </div>: null}
          {filterType === 'events' && events[0] === 'none' ? <div>
            <Card
              className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[250px] max-w-1/2'>
              <CardBody className='items-center'>
                <MaterialSymbol icon={'error'} size={72} className='text-warning'/>
              </CardBody>
              <Divider/>
              <CardBody className='text-center'>
                <div className='text-2xl font-semibold'>Brak wydarzeń</div>
                <div className='text-lg text-gray-500'>Nie znaleziono wydarzeń pasujących do wybranych filtrów.</div>
              </CardBody>
            </Card>
          </div> : null}
          {products[0] === 'error' && filterType === 'products' || events[0] === 'error' && filterType === 'events' ?
            <div>
              <Card
                className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[250px] max-w-1/2'>
                <CardBody className='items-center'>
                  <MaterialSymbol icon={'emergency_home'} size={72} className='text-danger'/>
                </CardBody>
                <Divider/>
                <CardBody className='text-center'>
                  <div className='text-2xl font-semibold'>wystąpił błąd</div>
                  <div className='text-lg text-gray-500'>Wystąpił nieznany błąd, spróbuj ponownie później.</div>
                </CardBody>
              </Card>
            </div> : null}
          {filterType === 'events' && events[0] !== 'loading' && events[0] !== 'none' && events[0] !== 'error' && events.map((event: any) => (
            <div>
              <Card className='md:hidden'>
                <CardBody className='w-full'>
                  {
                    event.images && event.images[0] ? (
                      <Image src={event.images[0]} alt={event.name} className='min-w-full w-full cover'/>
                    ) : (
                      <div
                        className='bg-primary w-full aspect-square bg-opacity-25 flex items-center justify-center rounded-xl'>
                        <MaterialSymbol icon='no_photography' size={72} className='text-white'/>
                      </div>
                    )
                  }
                </CardBody>
                <Divider/>
                <CardBody>
                  <div className='text-md font-semibold'>{event.name}</div>
                  <div className={event.price ? 'text-3xl font-bold rounded-xl whitespace-nowrap mr-2' : 'text-lg font-bold text-gray-500'}>{event.price ? `${event.price} zł` : 'Brak ceny'}</div>
                  <div className='text-xs text-white text-opacity-35'>
                    {event.description? event.description.substring(0, 200) : ''}
                  </div>
                  <div className='flex flex-row justify-end w-full items-center mt-2 gap-2'>
                    <Button isIconOnly color='secondary'>
                      <MaterialSymbol icon='share' size={22}/>
                    </Button>
                    <Button color='primary'>
                      <span>Dodaj do koszyka</span>
                      <MaterialSymbol icon='add_shopping_cart' size={22}/>
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card className='hidden md:flex flex-row items-stretch h-[13rem]'>
                <CardBody className='min-w-[13.25rem] w-[12rem] overflow-hidden'>
                  {
                    event.images && event.images[0] ? (
                      <div className='w-[11.5rem] h-[11.5rem] overflow-hidden flex flex-row items-center justify-center'>
                        <Image src={event.images[0]} alt={event.name} className='max-h-[11.5rem] max-w-[11.5rem]'/>
                      </div>
                    ) : (
                      <div className='bg-primary h-[11.5rem] w-[11.5rem] bg-opacity-25 flex items-center justify-center rounded-xl'>
                        <MaterialSymbol icon='no_photography' size={72} className='text-white'/>
                      </div>
                    )
                  }
                </CardBody>
                <Divider orientation='vertical'/>
                <CardBody className='relative'>
                  <span className='text-2xl font-semibold'>{event.name}</span>
                  <span className='text-3xl font-bold text-white bg-opacity-75 p-2 bg-primary rounded-lg absolute right-3'>{event.price ? `${event.price} zł` : 'Brak ceny'}</span>
                  {
                    event.tags? (
                      <div className='flex-row mt-2 max-w-1/2'>
                        {
                          event.tags.map((tag: any) => (
                            <Chip key={tag.id} color='primary'>{tag.name}</Chip>
                          ))
                        }
                      </div>
                    ) : null
                  }
                  <div className='text-xs text-white text-opacity-35 w-3/4'>
                    {event.description ? event.description.substring(0, 200) : ''}
                  </div>

                  <div className='flex flex-col absolute right-3 bottom-3 gap-2'>
                    <Button isIconOnly color='secondary' radius='sm'>
                      <MaterialSymbol icon='share' size={22}/>
                    </Button>
                    <Button isIconOnly color='primary' radius='sm'>
                      <MaterialSymbol icon='add_shopping_cart' size={22}/>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
          {filterType=== 'products' && products[0] !== 'loading' && products[0] !== 'none' && products[0] !== 'error' && products.map((product: any) => (
            <div>
              <Card className='md:hidden'>
                <CardBody>
                  {
                    product.images[0] ? (
                      <Image src={product.images[0]} alt={product.name} className='w-full aspect-square cover'/>
                    ) : (
                      <div className='bg-primary w-full aspect-square bg-opacity-25 flex items-center justify-center rounded-xl'>
                        <MaterialSymbol icon='no_photography' size={72} className='text-white'/>
                      </div>
                    )
                  }
                </CardBody>
                <Divider/>
                <CardBody>
                  <div className='text-md font-semibold'>{product.name}</div>
                  <div className={product.price ? 'text-3xl font-bold rounded-xl whitespace-nowrap mr-2' : 'text-lg font-bold text-gray-500'}>{product.price ? `${product.price} zł` : 'Brak ceny'}</div>
                  <div className='text-xs text-white text-opacity-35'>
                    {product.description.substring(0, 200)}
                  </div>
                  <div className='flex flex-row justify-end w-full items-center mt-2 gap-2'>
                    <Button isIconOnly color='secondary'>
                      <MaterialSymbol icon='share' size={22}/>
                    </Button>
                    <Button color='primary'>
                      <span>Dodaj do koszyka</span>
                      <MaterialSymbol icon='add_shopping_cart' size={22}/>
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card className='hidden md:flex flex-row items-stretch h-[13rem]'>
                <CardBody className='min-w-[13.25rem] w-[12rem] overflow-hidden'>
                  {
                    product.images[0] ? (
                      <div className='w-[11.5rem] h-[11.5rem] overflow-hidden flex flex-row items-center justify-center'>
                        <Image src={product.images[0]} alt={product.name} className='max-h-[11.5rem] max-w-[11.5rem]'/>
                      </div>
                    ) : (
                      <div className='bg-primary h-[11.5rem] w-[11.5rem] bg-opacity-25 flex items-center justify-center rounded-xl'>
                        <MaterialSymbol icon='no_photography' size={72} className='text-white'/>
                      </div>
                    )
                  }
                </CardBody>
                <Divider orientation='vertical'/>
                <CardBody className='relative'>
                  <span className='text-2xl font-semibold'>{product.name}</span>
                  <span className='text-3xl font-bold text-white bg-opacity-75 p-2 bg-primary rounded-lg absolute right-3'>{product.price ? `${product.price} zł` : 'Brak ceny'}</span>
                  {
                    product.tags? (
                      <div className='flex-row mt-2 max-w-1/2'>
                        {
                          product.tags.map((tag: any) => (
                            <Chip key={tag.id} color='primary'>{tag.name}</Chip>
                          ))
                        }
                      </div>
                    ) : null
                  }
                  <div className='text-xs text-white text-opacity-35 w-3/4'>
                    {product.description.substring(0, 200)}
                  </div>

                  <div className='flex flex-col absolute right-3 bottom-3 gap-2'>
                    <Button isIconOnly color='secondary' radius='sm'>
                      <MaterialSymbol icon='share' size={22}/>
                    </Button>
                    <Button isIconOnly color='primary' radius='sm'>
                      <MaterialSymbol icon='add_shopping_cart' size={22}/>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </main>
  )
}