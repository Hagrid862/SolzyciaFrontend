'use client'

import React, { useEffect, useState } from 'react'
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

export default function ViewProductPage() {
  const searchParams = useSearchParams()

  const offerStore = useOfferStore()

  const [status, setStatus] = useState<'loading' | 'error' | 'not-found' | 'success'>('loading')
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const [newName, setNewName] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string | undefined>('')
  const [newPrice, setNewPrice] = useState<number>(0)
  const [newCategory, setNewCategory] = useState<Category | null>(null)
  const [newImages, setNewImages] = useState<File[] | undefined>([])

  const id = searchParams.get('id')
  const type = searchParams.get('type')

  useEffect(() => {
    async function fetchProduct() {
      if ((type !== 'product' && type !== 'event') || (type === 'event' && !id)) {
        return
      }
      await offerStore.fetchCategories()
      if (type === 'product' && id) {
        const response = await offerStore.fetchProductById(id.toString())
        if (response.isSuccess && response.product) {
          setProduct(response.product)
          setNewName(response.product.Name)
          setNewDescription(response.product.Description)
          setNewPrice(response.product.Price)
          setNewCategory(response.product.Category)
          let imagesFile = response.product.Images?.map((image) => {
            const byteCharacters = atob(image.split(',')[1])
            const byteNumbers = new Array(byteCharacters.length)
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            const file = new File([byteArray], 'image.jpg', { type: 'image/jpeg' })
            return file
          })
          setNewImages(imagesFile)
          setStatus('success')
        } else {
          setStatus('error')
        }
      }
    }

    fetchProduct()
  }, [id, type])

  useEffect(() => {
    let lcategories = [
      ...(offerStore.categories as Category[]),
      {
        Id: '1',
        Name: 'Brak kategorii',
        Icon: 'category',
        Description: 'Brak kategorii',
        CreatedAt: new Date()
      } as Category
    ]
    setCategories(lcategories)
  }, [offerStore.categories])

  return (
    <>
      <Card shadow='none' className='border-opacity-15 border-white border-2 rounded-2xl max-w-[720px]'>
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
            {newImages ? (
              <Card className='flex flex-col gap-2 bg-white bg-opacity-5'>
                <CardBody className='aspect-square flex items-center justify-center'>
                  {newImages.length === 0 ? (
                    <div>
                      <MaterialSymbol icon='image' size={100} color='gray' />
                    </div>
                  ) : (
                    <Image
                      src={newImages && newImages.length > 0 ? URL.createObjectURL(newImages[0]) : ''}
                      alt={product?.Name}
                      radius='sm'
                      className='aspect-square'
                    />
                  )}
                </CardBody>
                <Divider />
                <CardBody className='flex flex-row gap-2 overflow-x-auto'>
                  {newImages.map((image, index) => (
                    <div key={index} className='relative'>
                      <div
                        className='absolute -left-2 -top-2 bg-white aspect-square z-50 w-6 h-6 flex items-center justify-center rounded-full bg-opacity-85 backdrop-blur-md'
                        onClick={() => {
                          let images = [...newImages]
                          images.splice(index, 1)
                          setNewImages(images)
                        }}
                      >
                        <MaterialSymbol icon='close' size={20} className='text-danger' />
                      </div>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={product?.Name}
                        radius='sm'
                        className='aspect-square max-w-16'
                      />
                    </div>
                  ))}
                  {newImages.length < 6 && (
                    <Card
                      isPressable
                      shadow='none'
                      className='w-16 aspect-square bg-primary-600 flex items-center justify-center bg-opacity-25'
                      radius='sm'
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.multiple = true
                        document.body.appendChild(input)
                        input.click()
                        input.onchange = (e) => {
                          const files = (e.target as HTMLInputElement).files
                          if (files) {
                            let images = [...newImages]
                            for (let i = 0; i < files.length; i++) {
                              images.push(files[i])
                            }
                            setNewImages(images)
                            console.log(newImages)
                          }
                          document.body.removeChild(input)
                        }
                      }}
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
                <Input label='Nazwa produktu' value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
              <Divider />
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-2'>
                  <Button color='primary' variant='shadow' isDisabled>
                    <MaterialSymbol icon='add_shopping_cart' size={24} />
                    Dodaj do koszyka
                  </Button>
                  <Tooltip content='Udostępnij'>
                    <Button color='secondary' variant='shadow' isIconOnly isDisabled>
                      <MaterialSymbol icon='share' size={24} />
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  <Input
                    label='Cena'
                    value={isNaN(newPrice) ? '0' : newPrice.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (!isNaN(value)) {
                        setNewPrice(value)
                      }
                    }}
                    color='primary'
                    variant='faded'
                  />
                </div>
              </div>
              <Divider />
              <Textarea label='Opis' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </div>
            <Divider />
            <div className='flex flex-col gap-2'>
              <Select
                label='Kategoria'
                items={categories}
                selectedKeys={newCategory?.Id ? [newCategory.Id] : []}
                onSelectionChange={(s) => {
                  const selectedCategory = categories.find((c) => c.Id === [...s].toString()) ?? null
                  setNewCategory(selectedCategory)
                }}
              >
                {(category: Category) => (
                  <SelectItem key={category.Id} value={category.Id}>
                    {category.Name}
                  </SelectItem>
                )}
              </Select>
            </div>
          </CardBody>
        )}
      </Card>
    </>
  )
}
