import {Card, CardBody, Select} from "@nextui-org/react";
import { login } from '@/store/slices/authSlice'; // Adjust the path according to your project structure

export default function OfertaLayout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <div>
      <Card className='sticky mx-2'>
        <CardBody>
          <div className='flex flexrow flex-nowrap'>
            <Select placeholder='Kategorie' className='w-full'/>
          </div>
        </CardBody>
      </Card>
      {children}
    </div>
  )
}