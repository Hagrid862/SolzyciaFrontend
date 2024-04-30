'use client'

import {Card, CardBody, Divider, Link} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";

export default function ProductsPage() {
  return (
    <div>
      <Link href='products/add'>
        <Card shadow='sm' className='max-w-[250px] min-w-[100px] max-h-[120px] min-h-[175px]' isPressable>
          <CardBody className='h-full'>
            <div className='w-full h-[100%] bg-white bg-opacity-5 flex items-center justify-center p-4 rounded-md'>
              <MaterialSymbol icon={'add_circle'} size={64} color='#006FEE'/>
            </div>
          </CardBody>
          <Divider/>
          <CardBody>
            <div className='text-center'>Dodaj produkt</div>
          </CardBody>
        </Card>
      </Link>
    </div>
  )
}