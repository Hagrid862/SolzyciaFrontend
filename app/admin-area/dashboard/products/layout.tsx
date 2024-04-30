'use client'

import {Card, CardBody, Divider, Tab, Tabs} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {Key} from "react";

export default function ProductsLayout({children}: Readonly<{children: React.ReactNode}>) {
  const router = useRouter();
  const pathname = usePathname();

  function onSelectionChange(s: Key) {
    router.push(s as string);
  }

  return (
    <div>
      <CardBody>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-xl font-semibold'>Zarządzaj produktami</div>
          {/*<Button color='primary'>*/}
          {/*  <span>Dodaj produkt</span>*/}
          {/*  <MaterialSymbol icon="add_circle" size={24}/>*/}
          {/*</Button>*/}
          <Tabs onSelectionChange={(s) => onSelectionChange(s)} selectedKey={pathname} variant='light'>
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