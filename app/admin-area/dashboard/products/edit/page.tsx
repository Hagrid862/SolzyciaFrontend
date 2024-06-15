'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Card,
  CardBody,
  Divider,
  Spinner,
  Image,
  Button,
  Tooltip,
  Input,
  Textarea,
  Select,
  SelectItem
} from '@nextui-org/react'
import { useOfferStore } from '@/store/offerStore'
import { Product } from '@/models/Product'
import { MaterialSymbol } from 'react-material-symbols'
import { Category } from '@/models/Category'
import { Key } from 'react'

export default function ViewProductPage() {
  const searchParams = useSearchParams()

  const offerStore = useOfferStore()

  const [status, setStatus] = useState<'loading' | 'error' | 'not-found' | 'success'>('loading')
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const [newName, setNewName] = useState<string | null>(null)
  const [newDescription, setNewDescription] = useState<string>('')
  const [newPrice, setNewPrice] = useState<number | null>(null)
  const [newCategory, setNewCategory] = useState<Category | null>(null)
  const [newImages, setNewImages] = useState<File[] | null>(null)

  const id = searchParams.get('id')
  const type = searchParams.get('type')

  useEffect(() => {
    async function fetchProduct() {
      if (type !== 'product' || ('event' && !id)) {
        return
      }
      await offerStore.fetchCategories()
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

  useEffect(() => {
    let lcategories = offerStore.categories as Category[]
    console.log(lcategories)
    lcategories.push({
      Id: '1',
      Name: 'Brak kategorii',
      Icon: 'category',
      Description: 'Brak kategorii',
      CreatedAt: new Date()
    } as Category)
    setCategories(lcategories)
  }, [offerStore.categories])

  return (
    <>
      <Card shadow='none' className='border border-opacity-15 border-white border-2'>
        {status === 'loading' && (
          <CardBody className='flex flex-col gap-2 lg:hidden'>
            <div className='w-full flex flex-col justify-center text-center gap-4'>
              <Spinner size='lg' />
              <div>Ładowanie</div>
            </div>
          </CardBody>
        )}
        {status === 'error' && (
          <CardBody>
            <div className='flex flex-col justify-center text-center gap-2'>
              <MaterialSymbol icon='error' size={48} color='red' />
              <div className='text-xl font-medium'>Nie znaleziono produktu</div>
            </div>
          </CardBody>
        )}
        {status === 'success' && (
          <CardBody className='gap-2'>
            {product?.Images ? (
              <Card className='flex flex-col gap-2 bg-white bg-opacity-5'>
                <CardBody className='aspect-square'>
                  <Image src={product.Images[0]} alt={product.Name} radius='sm' />
                </CardBody>
                <Divider />
                <CardBody className='flex flex-row gap-2 overflow-x-auto'>
                  {product.Images.map((image, index) => (
                    <div key={index} className='relative'>
                      <div className='absolute -left-2 -top-2 bg-white aspect-square z-50 w-6 h-6 flex items-center justify-center rounded-full bg-opacity-85 backdrop-blur-md'>
                        <MaterialSymbol icon='close' size={20} className='text-danger' />
                      </div>
                      <Image src={image} alt={product.Name} radius='sm' className='aspect-square max-w-16' />
                    </div>
                  ))}
                  {product.Images.length < 6 && (
                    <Card
                      isPressable
                      shadow='none'
                      className='w-16 aspect-square bg-primary-600 flex items-center justify-center bg-opacity-25'
                      radius='sm'
                    >
                      <MaterialSymbol icon='add' size={48} className='text-primary-500' />
                    </Card>
                  )}
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody className='aspect-square bg-white bg-opacity-5'>
                  <MaterialSymbol icon='image' size={64} color='gray' />
                </CardBody>
              </Card>
            )}
            <div className='gap-2 flex flex-col'>
              <div className='flex flex-row justify-between items-center'>
                <Input label='Nazwa produktu' value={product?.Name} />
              </div>
              <Divider />
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
                <div className='text-lg font-medium bg-primary bg-opacity-50 px-4 py-1 rounded-xl flex items-center'>
                  {product?.Price} zł
                </div>
              </div>
              <Divider />
              <Textarea label='Opis' value={product?.Description} />
            </div>
            <Divider />
            <div className='flex flex-col gap-2'>
              <Select label='Kategoria' items={categories} selectedKeys={[product?.Category.Id] as Iterable<Key>}>
                {(category: Category) => (
                  <SelectItem key={category.Id} value={category.Id}>
                    {category.Name}
                  </SelectItem>
                )}
              </Select>
              <div className='text-lg font-medium'>Opinie: 4.5 / 5</div>
              <div>
                <div className='flex flex-row gap-2'></div>
              </div>
            </div>
          </CardBody>
        )}
      </Card>
    </>
  )
}
