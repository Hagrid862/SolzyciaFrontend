'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Button, Card, CardBody, Checkbox, Divider, Image } from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'
import { ICartItem } from '@/models/CartItem'
import { useOrderStore } from '@/store/orderStore'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const store = useCartStore()
  const orderStore = useOrderStore()

  const router = useRouter()

  const [unselected, setUnselected] = useState<number[]>([])

  useEffect(() => {
    async function fetchCart() {
      const response = await store.getCartItems()
    }

    fetchCart()
  }, [])

  useEffect(() => {
    console.log(store.cartItems)
  }, [store.cartItems])

  const order = async () => {
    let items: { id: string; quantity: number; isEvent: boolean }[] = []

    store.cartItems.forEach((item, index) => {
      if (!unselected.includes(index)) {
        items.push({ id: item.ItemId, quantity: item.Quantity, isEvent: item.IsEvent })
      }
    })

    const response = await orderStore.placeOrder(items)
    if (response.orderId !== 0) {
      router.push(`/oferta/zamowienie/${response.orderId}`)
    }
  }

  return (
    <div className='flex flex-col items-center h-full'>
      <div className='max-w-[1300px] h-[calc(100vh-288px)] w-full px-2 pt-2 flex flex-col gap-2'>
        {store.cartItems.map((item, index) => (
          <div key={item.ItemId} className='flex flex-row w-full'>
            <Checkbox
              className='mx-2'
              size='lg'
              isSelected={!unselected.includes(index)}
              onClick={() => {
                if (unselected.includes(index)) {
                  setUnselected(unselected.filter((item) => item !== index))
                } else {
                  setUnselected([...unselected, index])
                }
              }}
            />
            <Card
              className={`flex flex-row w-full h-32 ${unselected.includes(index) ? 'opacity-75 scale-[97%]' : 'opacity-100 scale-100'}`}
            >
              <CardBody className='min-w-32 max-w-32 aspect-square'>
                {item.Image === 'noimage' ? (
                  <div className='w-full aspect-square flex items-center justify-center bg-primary bg-opacity-50 rounded-lg'>
                    <MaterialSymbol icon='no_photography' size={48} />
                  </div>
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <Image src={item.Image} alt={item.Name} className='max-w-24 max-h-24' radius='sm' />
                  </div>
                )}
              </CardBody>
              <Divider orientation='vertical' className='h-32' />
              <CardBody className='flex flex-row justify-between'>
                <div>
                  <div className='text-xl font-semibold'>{item.Name}</div>
                  <p className='text-sm'>Ilość: {item.Quantity}</p>
                  <p className='text-sm'>Typ: {item.IsEvent ? 'Wydarzenie' : 'Produkt'}</p>
                </div>
                <div className='h-full flex flex-col justify-between items-end'>
                  <h2 className='text-xl font-semibold'>{item.Price} zł</h2>
                  <Button isIconOnly variant='faded' color='danger' onClick={() => store.removeFromCart(item.ItemId)}>
                    <MaterialSymbol icon='delete' size={24} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <div className='h-[150px] w-full'>
        <Card className='w-[calc(100%-1rem)] h-[calc(100%-1rem)] m-2 flex flex-row'>
          <div className='flex flex-row w-full'>
            <CardBody className=''>
              <div className='flex flex-row justify-between'>
                <h2 className='text-2xl font-semibold'>Podsumowanie</h2>
              </div>
              <Divider className='my-2' />
              <div className='overflow-auto'>
                <div className='flex flex-row justify-between'>
                  <p>Łącznie:</p>
                  <h2>{store.cartItems.reduce((acc, item) => acc + item.Price, 0)} zł</h2>
                </div>
                <div className='flex flex-row justify-between'>
                  <p>Przesyłka:</p>
                  <h2>0 zł</h2>
                </div>
              </div>
            </CardBody>
            <Divider orientation='vertical' />
            <CardBody className='w-32 flex flex-col items-stretch justify-center'>
              <Button variant='shadow' color='primary' onClick={async () => await order()}>
                Zamów
              </Button>
            </CardBody>
          </div>
        </Card>
      </div>
    </div>
  )
}
