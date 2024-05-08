'use client'

import {Card, CardBody, Divider, Spinner, Tab, Tabs} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";
import {useRouter} from "next/navigation";
import {useAdminStore} from "@/store/adminStore";
import {useEffect} from "react";
import {Button} from "@nextui-org/button";

export default function Categories() {
  const router = useRouter();

  const fetchCategories = useAdminStore(state => state.fetchCategories);
  const categories = useAdminStore(state => state.categories);

  useEffect( () => {
    fetchCategories();
  }, []); // Corrected useEffect closing

  return (
    <div className='flex flex-col gap-4'>
      <Card onClick={() => router.push('/admin-area/dashboard/products/categories/add')} shadow='sm' className='w-full h-[64px] flex flex-row bg-white bg-opacity-5' isPressable>
        <CardBody className='max-w-[80px] bg-primary bg-opacity-15'>
          <div className='w-full flex items-center justify-center'>
            <MaterialSymbol icon={'new_label'} size={40} color='#006FEE'/>
          </div>
        </CardBody>
        <Divider orientation='vertical' className='h-[64px]'/>
        <CardBody className='flex flex-row items-center h-full'>
          <div className='text-2xl font-medium'>Dodaj kategorie</div>
        </CardBody>
      </Card>

      <Divider/>

      <div className='flex flex-row justify-stretch flex-wrap gap-2'>
        { categories[0] === 'loading' ? <div className='w-full flex flex-col items-center'>
            <Spinner className='mt-[5vh] mb-2'/>
            <div>Ładowanie...</div>
          </div> : null }
        {categories[0] !== 'loading' && categories[0] !== 'none' && categories[0] !== 'error' && categories.length !== 0 ? categories.map((category, index) => (
          <Card isPressable onClick={() => router.push(`categories/${category.id}`)} key={index} className='w-[calc(100%/3-0.35rem)] min-w-[100px] max-w-[200px] bg-white bg-opacity-5 overflow-x-hidden'>
            <CardBody className='overflow-x-hidden bg-primary bg-opacity-15 text-center'>
              <MaterialSymbol icon={category.icon} size={40} color='#006FEE'/>
            </CardBody>
            <Divider/>
            <CardBody>
              <div className='text-xl font-medium'>{category.name}</div>
              <div className='text-sm'>{category.description}</div>
            </CardBody>
          </Card>
        )) : null}
      </div>
    </div>
  )
}