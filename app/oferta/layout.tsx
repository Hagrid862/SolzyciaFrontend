'use client';

import {Card, CardBody, Divider, Select, SelectItem, Tab, Tabs} from "@nextui-org/react";
import 'react-material-symbols/rounded';
import React, {useEffect} from "react";
import {useOfferStore} from "@/store/offerStore";
import {MaterialSymbol} from "react-material-symbols";
import {useRouter} from "next/navigation";

export default function OfertaLayout({children}: Readonly<{children: React.ReactNode}>) {
  const router = useRouter();
  const store = useOfferStore();

  const selectedCategory = store.filterCategory;

  useEffect(() => {
    store.fetchCategories();
    store.initFilters();
  }, []);

  const categoryChange = (category: string) => {
    if (category === '' || category === null || category === undefined) {
      store.setFilterCategory('all-categories');
    }
    store.setFilterCategory(category);
  }

  return (
    <div>
      <Card className='sticky mb-2 w-[1200px] max-w-[calc(100vw-1rem)] mx-auto'>
        <CardBody className='flex flex-col gap-2'>
          <Tabs fullWidth onSelectionChange={(e) => store.setFilterType(e as string)} selectedKey={store.filterType}>
            <Tab key='events' title='wydarzenia'/>
            <Tab key='products' title='Produkty'/>
          </Tabs>
          <div className='flex flexrow flex-nowrap'>
            <Select placeholder='Kategorie' className='w-full' selectedKeys={[selectedCategory]} onChange={(e) => categoryChange(e.target.value)} aria-label='select category'>
              <SelectItem value='all-categories' startContent={<MaterialSymbol icon='category' size={20} color={'#006FEE'}/>} key='all-categories' textValue='Wszystkie kategorie'>
                Wszystkie
              </SelectItem>
              {
                store.categories.map((category: any, index: any) => (
                  <SelectItem key={category.id} value={category.id}
                              startContent={<MaterialSymbol icon={category.icon} size={20} color={'#006FEE'}/>} textValue={category.name}>
                    {category.name}
                  </SelectItem>
                ))
              }
            </Select>
          </div>
        </CardBody>
      </Card>
      <Divider/>
      {children}
    </div>
  )
}