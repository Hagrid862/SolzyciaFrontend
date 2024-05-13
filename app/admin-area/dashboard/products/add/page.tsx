'use client'

import {Card, CardBody} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";
import {useRouter} from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  return (
    <div className='flex flex-col md:flex-row gap-4 h-[400px] md:h-full md:justify-center items-center'>
      <Card onClick={() => router.push('add/object')} isPressable className='w-full md:w-[30%] h-[200px] md:h-[150px] flex flex-col items-center justify-center bg-white bg-opacity-5'>
        <MaterialSymbol icon='category' size={64}/>
        <span className='text-xl font-medium'>Przedmiot</span>
      </Card>
      <Card onClick={() => router.push('add/event')} isPressable className='w-full md:w-[30%] h-[200px] md:h-[150px] flex flex-col items-center justify-center bg-white bg-opacity-5'>
        <MaterialSymbol icon='calendar_clock' size={64}/>
        <span className='text-xl font-medium'>Wydarzenie</span>
      </Card>
    </div>
  );
}