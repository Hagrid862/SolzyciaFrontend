'use client'

import {Card, CardBody, CardHeader, Divider, Link, Tab, Tabs} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {Key, useEffect, useState} from "react";
import 'react-material-symbols/rounded'


export default function DashboardPage({children}: Readonly<{children: React.ReactNode}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  function onSelectionChange(s: Key) {
    router.push(s as string);
    setSelectedKey(s == '/admin-area/dashboard' ? '/admin-area/dashboard' : tabKeys.find(key => pathname.startsWith(key))??'/admin-area/dashboard');
  }

  const tabKeys = [
    '/admin-area/dashboard/calendar',
    '/admin-area/dashboard/reservations',
    '/admin-area/dashboard/products',
  ];

  const [selectedKey, setSelectedKey] = useState<string>(tabKeys[0]);

  useEffect(() => {
    setSelectedKey(pathname  == '/admin-area/dashboard' ? '/admin-area/dashboard' : tabKeys.find(key => pathname.startsWith(key))??'/admin-area/dashboard');
  }, [pathname]);

  return (
    <div className='w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4'>
      <div className='md:w-[250px] max-w-screen md:h-[calc(100vh-1rem)]'>
        <Card className='w-[calc(100vw-1rem)] md:w-auto  mt-2 md:mt-0 md:h-full flex items-stretch justify-start'>
          <CardBody className=' overflow-x-auto'>
            <Tabs onSelectionChange={(s) => onSelectionChange(s)} placement={windowWidth && windowWidth > 768 ? 'start' : 'top'} aria-label="Tabs" fullWidth variant='light' selectedKey={selectedKey}>
              <Tab key='/admin-area/dashboard' className="text-left" title='Podsumowanie'/>
              <Tab key='/admin-area/dashboard/calendar' className="text-left" title='Kalendarz'/>
              <Tab key='/admin-area/dashboard/reservations' className="text-left" title='Rezerwacje'/>
              <Tab key='/admin-area/dashboard/products' className="text-left" title='Produkty'/>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <div className='w-[calc(100vw-1rem)] md:w-[calc(100vw-250px-3rem)] h-[calc(100vh-1rem)]'>
        <Card className='h-[calc(100vh-1rem)]'>
          {children}
        </Card>
      </div>
    </div>
  )
}