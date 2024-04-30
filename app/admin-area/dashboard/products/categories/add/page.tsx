import {Button, Card, CardBody, Input, Link} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";

export default function AddCategoriesPage() {
  return (
    <div>
      <div className='text-xl'>Dodaj kategorie</div>
      <Card className='w-full mt-4 bg-white bg-opacity-5'>
        <CardBody className='flex flex-col gap-4'>
          <Input label='Nazwa kategorii' variant='underlined'/>
          <Textarea label='Opis' variant='underlined'/>
          <Input label='Ikonka' variant='underlined'/>
          <div className='flex flex-row'>
            <span>zobacz dostępne ikony na&nbsp; </span><Link target='_blank' href='https://fonts.google.com/icons'>Ikonach Google</Link>
          </div>
        </CardBody>
      </Card>
      <Button className='mt-4 w-full' color='primary' variant='solid'>Dodaj kategorie</Button>
    </div>
  )
}