import {Card, CardBody, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

export default function ProductsPage() {
  return (
    <div>
      <CardBody>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-xl font-semibold'>Zarządzaj produktami</div>
          <Button color='primary'>
            Dodaj produkt
          </Button>
        </div>
      </CardBody>
      <Divider/>
      <CardBody>

      </CardBody>
    </div>
  )
}