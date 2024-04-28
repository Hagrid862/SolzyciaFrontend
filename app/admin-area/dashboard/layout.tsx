'use client'

import {Card, CardBody, CardHeader, Divider, Link, Tab, Tabs} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {Key} from "react";

export default function DashboardPage({children}: Readonly<{children: React.ReactNode}>) {
  const pathname = usePathname();
  const router = useRouter();
  const windowWidth = window.innerWidth;

  function onSelectionChange(s: Key) {
    router.push(s as string);
  }

  return (
    <div className='w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4'>
      <div className='md:w-[250px] max-w-screen md:h-[calc(100vh-2rem)]'>
        <Card className='w-[calc(100vw-1rem)] md:w-auto  mt-2 md:mt-0 md:h-full flex items-stretch justify-start'>
          <CardBody className=' overflow-x-auto'>
            <Tabs onSelectionChange={(s) => onSelectionChange(s)} placement={windowWidth && windowWidth > 768 ? 'start' : 'top'} aria-label="Tabs" fullWidth variant='light' selectedKey={pathname}>
              <Tab key='/admin-area/dashboard' className="text-left" title='Podsumowanie'/>
              <Tab key='/admin-area/dashboard/calendar' className="text-left" title='Kalendarz'/>
              <Tab key='/admin-area/dashboard/reservations' className="text-left" title='Rezerwacje'/>
              <Tab key='/admin-area/dashboard/products' className="text-left" title='Produkty'/>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <div className='w-[calc(100vw-1rem)] md:w-[calc(100vw-250px-3rem)] h-[calc(100vh-2rem)]'>
        <Card className='h-[calc(100%-0.5rem)]'>
          {children}
        </Card>
      </div>
    </div>
  )
}