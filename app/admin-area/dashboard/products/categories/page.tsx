'use client'

import {Card, CardBody, Divider, Tab, Tabs} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";
import {useRouter} from "next/navigation";

export default function Categories() {
  const router = useRouter();

  return (
    <div>
      <Card onClick={() => router.push('/admin-area/dashboard/products/categories/add')} shadow='sm' className='max-w-[250px] min-w-[100px] max-h-[120px] min-h-[175px] bg-white bg-opacity-5' isPressable>
        <CardBody className='h-full flex flex-row'>
          <div className='w-full h-[100%] bg-opacity-5 flex items-center justify-center p-4 rounded-md'>
            <MaterialSymbol icon={'new_label'} size={64} color='#006FEE'/>
          </div>
        </CardBody>
        <Divider/>
        <CardBody>
          <div className='text-center'>Dodaj kategorie</div>
        </CardBody>
      </Card>
    </div>
  )
}