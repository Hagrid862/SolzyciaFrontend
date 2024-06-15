'use client'

import { useOfferStore } from '@/store/offerStore'
import { useEffect, useState } from 'react'
import { Card, CardBody, Chip, Divider, Image, Spinner } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { ICartItemCookie } from '@/models/CartItemCookie'
import { Event } from '@/models/Event'

export default function Home() {
  const router = useRouter()
  const fetchProducts = useOfferStore((state) => state.fetchProducts)
  const fetchEvents = useOfferStore((state) => state.fetchEvents)
  const products = useOfferStore((state) => state.products)
  const events = useOfferStore((state) => state.events)

  const cartStore = useCartStore()

  const [showAddToCardBanner, setShowAddToCardBanner] = useState(false)

  const addToCart = (itemId: string, isEvent: boolean) => {
    setShowAddToCardBanner(true)
    cartStore.addToCart(itemId, isEvent)
    cartStore.getCartItems()
    setTimeout(() => {
      setShowAddToCardBanner(false)
    }, 3000)
  }

  const filterType = useOfferStore((state) => state.filterType)

  useEffect(() => {
    async function fetchCart() {
      const response = await cartStore.getCartItems()
    }

    cartStore.getRawCartItems()
    fetchProducts()
    fetchEvents()
  }, [])

  useEffect(() => {
    console.log('products')
    console.log(products)
    console.log('events')
    console.log(events)
    console.log('cartItems')
    console.log(cartStore.rawCart)
  }, [products, events, cartStore.rawCart, cartStore.cartItems])

  return (
    <main className='p-2 flex items-center justify-start flex-col'>
      <div className='sm:grid grid-cols-1 gap-4 md:flex md:flex-col w-[1200px] max-w-[calc(100vw-1rem)]'>
        {(products[0] === 'loading' && filterType === 'products') ||
        (events[0] === 'loading' && filterType === 'events') ? (
          <div className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Spinner size='lg' />
          </div>
        ) : null}
        {filterType === 'products' && products[0] === 'none' ? (
          <div>
            <Card className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[250px] max-w-1/2'>
              <CardBody className='items-center'>
                <MaterialSymbol icon={'error'} size={72} className='text-warning' />
              </CardBody>
              <Divider />
              <CardBody className='text-center'>
                <div className='text-2xl font-semibold'>Brak produktów</div>
                <div className='text-lg text-gray-500'>Nie znaleziono produktów pasujących do wybranych filtrów.</div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        {filterType === 'events' && events[0] === 'none' ? (
          <div>
            <Card className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[250px] max-w-1/2'>
              <CardBody className='items-center'>
                <MaterialSymbol icon={'error'} size={72} className='text-warning' />
              </CardBody>
              <Divider />
              <CardBody className='text-center'>
                <div className='text-2xl font-semibold'>Brak wydarzeń</div>
                <div className='text-lg text-gray-500'>Nie znaleziono wydarzeń pasujących do wybranych filtrów.</div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        {(products[0] === 'error' && filterType === 'products') ||
        (events[0] === 'error' && filterType === 'events') ? (
          <div>
            <Card className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[250px] max-w-1/2'>
              <CardBody className='items-center'>
                <MaterialSymbol icon={'emergency_home'} size={72} className='text-danger' />
              </CardBody>
              <Divider />
              <CardBody className='text-center'>
                <div className='text-2xl font-semibold'>wystąpił błąd</div>
                <div className='text-lg text-gray-500'>Wystąpił nieznany błąd, spróbuj ponownie później.</div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        {filterType === 'events' &&
          events[0] !== 'loading' &&
          events[0] !== 'none' &&
          events[0] !== 'error' &&
          events.map((event: Event | any) => (
            <div key={event.Id}>
              <Card className='md:hidden' isPressable onPress={() => router.push(`oferta/wydarzenie/${event.Id}`)}>
                <CardBody className='w-full'>
                  {event.Images && event.Images[0] ? (
                    <Image src={event.Images[0]} alt={event.Name} className='min-w-full w-full cover' />
                  ) : (
                    <div className='bg-primary w-full aspect-square bg-opacity-25 flex items-center justify-center rounded-xl'>
                      <MaterialSymbol icon='no_photography' size={72} className='text-white' />
                    </div>
                  )}
                </CardBody>
                <Divider />
                <CardBody>
                  <div className='text-md font-semibold'>{event.Name}</div>
                  <div
                    className={
                      event.Price
                        ? 'text-3xl font-bold rounded-xl whitespace-nowrap mr-2'
                        : 'text-lg font-bold text-gray-500'
                    }
                  >
                    {event.Price ? `${event.Price} zł` : 'Brak ceny'}
                  </div>
                  <div className='text-xs text-white text-opacity-35'>
                    {event.Description ? event.Description.substring(0, 200) : ''}
                  </div>
                  <div className='flex flex-row justify-end w-full items-center mt-2 gap-2'>
                    <Button isIconOnly color='secondary'>
                      <MaterialSymbol icon='share' size={22} />
                    </Button>
                    <Button
                      color='primary'
                      isDisabled={
                        cartStore.rawCart.find((item: ICartItemCookie) => item.Id === event.Id) ? true : false
                      }
                      onClick={() => addToCart(event.Id, true)}
                    >
                      <span>
                        {cartStore.rawCart.find((item: ICartItemCookie) => item.Id === event.Id)
                          ? 'Dodano do koszyka'
                          : 'Dodaj do koszyka'}
                      </span>
                      <MaterialSymbol icon='add_shopping_cart' size={22} />
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card
                className='hidden md:flex flex-row items-stretch h-[13rem] w-full'
                isPressable
                onPress={() => router.push(`oferta/wydarzenie/${event.Id}`)}
              >
                <CardBody className='min-w-[13.25rem] w-[12rem] overflow-hidden'>
                  {event.Images && event.Images[0] ? (
                    <div className='w-[11.5rem] h-[11.5rem] overflow-hidden flex flex-row items-center justify-center'>
                      <Image src={event.Images[0]} alt={event.Name} className='max-h-[11.5rem] max-w-[11.5rem]' />
                    </div>
                  ) : (
                    <div className='bg-primary h-[11.5rem] w-[11.5rem] bg-opacity-25 flex items-center justify-center rounded-xl'>
                      <MaterialSymbol icon='no_photography' size={72} className='text-white' />
                    </div>
                  )}
                </CardBody>
                <Divider orientation='vertical' />
                <CardBody className='relative'>
                  <span className='text-2xl font-semibold'>{event.Name}</span>
                  <span className='text-3xl font-bold text-white bg-opacity-75 p-2 bg-primary rounded-lg absolute right-3'>
                    {event.Price ? `${event.Price} zł` : 'Brak ceny'}
                  </span>
                  {event.Tags ? (
                    <div className='flex-row mt-2 max-w-1/2'>
                      {event.Tags.map((tag: any) => (
                        <Chip key={tag.Id} color='primary'>
                          {tag.Name}
                        </Chip>
                      ))}
                    </div>
                  ) : null}
                  <div className='text-xs text-white text-opacity-35 w-3/4'>
                    {event.Description ? event.Description.substring(0, 200) : ''}
                  </div>

                  <div className='flex flex-col absolute right-3 bottom-3 gap-2'>
                    <Button isIconOnly color='secondary' radius='sm'>
                      <MaterialSymbol icon='share' size={22} />
                    </Button>
                    <Button
                      isIconOnly
                      color='primary'
                      radius='sm'
                      isDisabled={cartStore.rawCart.find((item) => item.Id === event.Id) ? true : false}
                      onClick={() => addToCart(event.Id, true)}
                    >
                      <MaterialSymbol
                        icon={
                          cartStore.rawCart.find((item: ICartItemCookie) => item.Id === event.Id)
                            ? 'check_circle_filled'
                            : 'add_shopping_cart'
                        }
                        size={22}
                      />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        {filterType === 'products' &&
          products[0] !== 'loading' &&
          products[0] !== 'none' &&
          products[0] !== 'error' &&
          products.map((product: any) => (
            <div key={product.Id}>
              <Card className='md:hidden' isPressable onPress={() => router.push(`oferta/produkt/${product.Id}`)}>
                <CardBody>
                  {product.Images?.[0] ? (
                    <Image src={product.Images[0]} alt={product.Name} className='w-full aspect-square cover' />
                  ) : (
                    <div className='bg-primary w-full aspect-square bg-opacity-25 flex items-center justify-center rounded-xl'>
                      <MaterialSymbol icon='no_photography' size={72} className='text-white' />
                    </div>
                  )}
                </CardBody>
                <Divider />
                <CardBody>
                  <div className='text-md font-semibold'>{product.Name}</div>
                  <div
                    className={
                      product.Price
                        ? 'text-3xl font-bold rounded-xl whitespace-nowrap mr-2'
                        : 'text-lg font-bold text-gray-500'
                    }
                  >
                    {product.Price ? `${product.Price} zł` : 'Brak ceny'}
                  </div>
                  <div className='text-xs text-white text-opacity-35'>{product.Description?.substring(0, 200)}</div>
                  <div className='flex flex-row justify-end w-full items-center mt-2 gap-2'>
                    <Button isIconOnly color='secondary'>
                      <MaterialSymbol icon='share' size={22} />
                    </Button>
                    <Button
                      color='primary'
                      radius='sm'
                      onClick={() => addToCart(product.Id, false)}
                      isDisabled={
                        cartStore.rawCart.find((item: ICartItemCookie) => item.Id === product.Id) ? true : false
                      }
                    >
                      <span>Dodaj do koszyka</span>
                      <MaterialSymbol
                        icon={
                          cartStore.rawCart.find((item: ICartItemCookie) => item.Id === product.Id)
                            ? 'check_circle_filled'
                            : 'add_shopping_cart'
                        }
                        size={22}
                      />
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card
                className='hidden md:flex flex-row items-stretch h-[13rem] w-full'
                isPressable
                onPress={() => router.push(`oferta/produkt/${product.Id}`)}
              >
                <CardBody className='min-w-[13.25rem] w-[12rem] overflow-hidden'>
                  {product.Images?.[0] ? (
                    <div className='w-[11.5rem] h-[11.5rem] overflow-hidden flex flex-row items-center justify-center'>
                      <Image src={product.Images[0]} alt={product.Name} className='max-h-[11.5rem] max-w-[11.5rem]' />
                    </div>
                  ) : (
                    <div className='bg-primary h-[11.5rem] w-[11.5rem] bg-opacity-25 flex items-center justify-center rounded-xl'>
                      <MaterialSymbol icon='no_photography' size={72} className='text-white' />
                    </div>
                  )}
                </CardBody>
                <Divider orientation='vertical' />
                <CardBody className='relative'>
                  <span className='text-2xl font-semibold'>{product.Name}</span>
                  <span className='text-3xl font-bold text-white bg-opacity-75 p-2 bg-primary rounded-lg absolute right-3'>
                    {product.Price ? `${product.Price} zł` : 'Brak ceny'}
                  </span>
                  {product.Tags ? (
                    <div className='flex-row mt-2 max-w-1/2'>
                      {product.Tags.map((tag: any) => (
                        <Chip key={tag.Id} color='primary'>
                          {tag.Name}
                        </Chip>
                      ))}
                    </div>
                  ) : null}
                  <div className='text-xs text-white text-opacity-35 w-3/4'>
                    {product.Description?.substring(0, 200)}
                  </div>

                  <div className='flex flex-col absolute right-3 bottom-3 gap-2'>
                    <Button isIconOnly color='secondary' radius='sm'>
                      <MaterialSymbol icon='share' size={22} />
                    </Button>
                    <Button
                      isIconOnly
                      color='primary'
                      radius='sm'
                      onClick={() => addToCart(product.Id, false)}
                      isDisabled={
                        cartStore.rawCart.find((item: ICartItemCookie) => item.Id === product.Id) ? true : false
                      }
                    >
                      <MaterialSymbol
                        icon={
                          cartStore.rawCart.find((item: ICartItemCookie) => item.Id === product.Id)
                            ? 'check_circle_filled'
                            : 'add_shopping_cart'
                        }
                        size={22}
                      />{' '}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
      <Card
        className={`fixed left-1/2 transform -translate-x-1/2 bottom-0 ${showAddToCardBanner ? 'transform -translate-y-10 scale-100' : 'transform translate-y-24 scale-75'} transition-transform duration-150`}
      >
        <CardBody>Produktu został dodany do koszyka</CardBody>
      </Card>
    </main>
  )
}
