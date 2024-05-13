'use client'

import {Card, CardBody, Divider, Tab, Tabs} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {Key, useEffect, useState} from "react";

export default function ProductsLayout({children}: Readonly<{children: React.ReactNode}>) {
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState<string>(pathname);

  function onSelectionChange(s: Key) {
      if ( tabKeys.includes(pathname) && tabKeys.includes(s as string)) {
        console.log(s as string);
        router.push(s as string);
        setSelected(s as string);
      }
  }

  //listen to pathname change
  //   useEffect(() => {
  //       setSelected(pathname == '/admin-area/dashboard/products' ? '/admin-area/dashboard/products' : tabKeys.find(key => pathname.startsWith(key))??'/admin-area/dashboard');
  //   });

    const tabKeys = [
      '/admin-area/dashboard/products',
      '/admin-area/dashboard/products/categories',
    ];

  return (
    <div className='overflow-y-auto'>
      <CardBody>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-xl font-semibold'>Zarządzaj produktami</div>
          <Tabs onSelectionChange={(s) => onSelectionChange(s)} selectedKey={selected} variant='light'>
            <Tab key='/admin-area/dashboard/products' title="Wszystkie produkty"/>
            <Tab key='/admin-area/dashboard/products/categories' title="Kategorie"/>
            <Tab title="Archiwum"/>
          </Tabs>
        </div>
      </CardBody>
      <Divider/>
      <CardBody>
        {children}
      </CardBody>
    </div>
  )
}