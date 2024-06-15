'use client';

import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation';
import { Card, CardBody, Divider, Spinner, Image, Button, Tooltip } from '@nextui-org/react';
import { useOfferStore } from '@/store/offerStore';
import { Product } from '@/models/Product';
import { MaterialSymbol } from 'react-material-symbols';

export default function ViewProductPage() {
  const searchParams = useSearchParams()

  const offerStore = useOfferStore()

  const [status, setStatus] = useState<'loading' | 'error' | 'not-found' | 'success'>('loading')
  const [product, setProduct] = useState<Product | null>(null)

  const id = searchParams.get('id')
  const type = searchParams.get('type')

  useEffect(() => {
    async function fetchProduct() {
      if (type !== 'product' || 'event' && !id) {
        return
      }
      if (type === 'product') {
        const response = await offerStore.fetchProductById(id!.toString())
        if (response.isSuccess && response.product) {
          setProduct(response.product)
          setStatus('success')
        } else {
          setStatus('error')
        }
      }
    }

    fetchProduct()
  }, [id, type])

  return (
    <>
      <Card shadow='none' className='border border-opacity-15 border-white border-2'>
        {
          status === 'loading' && (
            <CardBody className='flex flex-col gap-2 lg:hidden'>
              <div className='w-full flex flex-col justify-center text-center gap-4'>
                <Spinner size='lg' />
                <div>Ładowanie</div>
              </div>
            </CardBody>
          )
        }
        {
          status === 'error' && (
            <CardBody>
              <div className='flex flex-col justify-center text-center gap-2'>
                <MaterialSymbol icon='error' size={48} color='red' />
                <div className='text-xl font-medium'>Nie znaleziono produktu</div>
              </div>
            </CardBody>
          )
        }
        {
          status === 'success' && (
            <CardBody className='gap-2'>
              {
                product?.Images ? (
                  <Card className='flex flex-col gap-2 bg-white bg-opacity-5'>
                    <CardBody className='aspect-square'>
                      <Image
                        src={product.Images[0]}
                        alt={product.Name}
                        radius='sm'
                      />
                    </CardBody>
                    <Divider/>
                    <CardBody className='flex flex-row gap-2 overflow-x-auto'>
                      {
                        product.Images.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={product.Name}
                            radius='sm'
                            className='aspect-square max-w-16'
                          />
                        ))
                      }
                    </CardBody>
                  </Card>
                ) : (
                  <Card>
                    <CardBody className='aspect-square bg-white bg-opacity-5'>
                      <MaterialSymbol icon='image' size={64} color='gray' />
                    </CardBody>
                  </Card>
                )
              }
              <div className='gap-2 flex flex-col'>
                <div className='flex flex-row justify-between items-center'>
                  <div className='text-xl font-medium'>{product?.Name}</div>
                </div>
                <Divider/>
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row gap-2'>
                    <Button color='primary' variant='shadow'>
                      <MaterialSymbol icon='add_shopping_cart' size={24} />
                      Dodaj do koszyka
                    </Button>
                    <Tooltip content='Udostępnij'>
                      <Button color='secondary' variant='shadow' isIconOnly>
                        <MaterialSymbol icon='share' size={24} />
                      </Button>
                    </Tooltip>
                  </div>
                  <div className='text-lg font-medium bg-primary bg-opacity-50 px-4 py-1 rounded-xl flex items-center'>{product?.Price} zł</div>
                </div>
                <Divider/>
                <div className='text-sm text-gray-500'>{product?.Description}</div>
              </div>
              <Divider/>
              <div className='flex flex-col gap-2'>
                <div className='text-lg font-medium'>Kategoria: { product?.Category.Name ?? "Brak"}</div>
                <div className='text-lg font-medium'>Opinie: 4.5 / 5</div>
                <div>
                  <div className='flex flex-row gap-2'>
                  </div>
                </div>
              </div>
            </CardBody>
          )
        }
      </Card>
    </>
  );
}