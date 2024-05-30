'use client'

import { Card, CardBody, Divider, Select, SelectItem, Tab, Tabs, Tooltip } from '@nextui-org/react'
import 'react-material-symbols/rounded'
import React, { useEffect } from 'react'
import { useOfferStore } from '@/store/offerStore'
import { MaterialSymbol } from 'react-material-symbols'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'

export default function OfertaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const pathname = usePathname()
  const store = useOfferStore()

  const selectedCategory = store.filterCategory

  useEffect(() => {
    store.fetchCategories()
    store.initFilters()
  }, [])

  const categoryChange = (category: string) => {
    if (category === '' || category === null || category === undefined) {
      store.setFilterCategory('all-categories')
    }
    store.setFilterCategory(category)
  }

  return (
    <div>
      <Card className='sticky mb-2 w-[1200px] max-w-[calc(100vw-1rem)] mx-auto'>
        {pathname === '/oferta' || pathname === '/oferta' ? (
          <CardBody className='flex flex-col gap-2'>
            <Tabs fullWidth onSelectionChange={(e) => store.setFilterType(e as string)} selectedKey={store.filterType}>
              <Tab key='events' title='wydarzenia' />
              <Tab key='products' title='Produkty' />
            </Tabs>
            <div className='flex flexrow flex-nowrap'>
              <Select
                placeholder='Kategorie'
                className='w-full'
                selectedKeys={[selectedCategory]}
                onChange={(e) => categoryChange(e.target.value)}
                aria-label='select category'
              >
                <SelectItem
                  value='all-categories'
                  startContent={<MaterialSymbol icon='category' size={20} color={'#006FEE'} />}
                  key='all-categories'
                  textValue='Wszystkie kategorie'
                >
                  Wszystkie
                </SelectItem>
                {store.categories.map((category: any, index: any) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    startContent={<MaterialSymbol icon={category.icon} size={20} color={'#006FEE'} />}
                    textValue={category.name}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        ) : (
          <CardBody className='flex flex-row gap-2'>
            <Button className='w-full' onClick={() => router.push('/oferta')}>
              Wróć do oferty
            </Button>
            <Tooltip content='Koszyk' placement='bottom'>
              <Button isIconOnly color='primary' onClick={() => router.push('/oferta/koszyk')}>
                <MaterialSymbol icon='shopping_cart' size={20} color={'#ffffff'} />
              </Button>
            </Tooltip>
          </CardBody>
        )}
      </Card>
      <Divider />
      {children}
    </div>
  )
}
