'use client'

import { Product } from '@/models/Product'
import { useOfferStore } from '@/store/offerStore'
import { Card, CardBody, CardHeader, Divider, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MaterialSymbol } from 'react-material-symbols'

export default function OfferProductPage({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined)

  const offerStore = useOfferStore()

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await offerStore.fetchProductById(params.productId)

      console.log('response', response)

      if (response.isSuccess) {
        setProduct(response.product)
      } else {
        setProduct(null)
      }
    }

    fetchProduct()
  }, [])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {product === undefined && (
        <Card className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <CardHeader className='flex items-center justify-center flex-col text-primary gap-4 text-xl'>
            <Spinner size='lg' />
            <p className='text-xl'>Loading...</p>
          </CardHeader>
        </Card>
      )}
      {product === null && (
        <Card className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <CardHeader className='flex items-center justify-center flex-col text-red-500 gap-2 text-xl'>
            <MaterialSymbol icon='error' size={64} />
            <p className='text-xl text-red-400'>Product not found</p>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
