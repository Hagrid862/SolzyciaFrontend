'use client'

import { Card, CardBody, CardHeader, Divider, Link, Spacer, Tab, Tabs } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { Key, useEffect, useState } from 'react'
import 'react-material-symbols/rounded'
import { Button } from '@nextui-org/button'
import { useAdminStore } from '@/store/adminStore'

export default function DashboardPage({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState<number | undefined>()

  const logout = useAdminStore((state) => state.logout)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
    }
  }, [])
  function onSelectionChange(s: Key) {
    router.push(s as string)
    setSelectedKey(
      s == '/admin-area/dashboard'
        ? '/admin-area/dashboard'
        : tabKeys.find((key) => pathname.startsWith(key)) ?? '/admin-area/dashboard'
    )
  }

  const tabKeys = [
    '/admin-area/dashboard/calendar',
    '/admin-area/dashboard/reservations',
    '/admin-area/dashboard/products',
    '/admin-area/dashboard/products/categories/add'
  ]

  const [selectedKey, setSelectedKey] = useState<string>(tabKeys[0])

  useEffect(() => {
    setSelectedKey(
      pathname == '/admin-area/dashboard'
        ? '/admin-area/dashboard'
        : tabKeys.find((key) => pathname.startsWith(key)) ?? '/admin-area/dashboard'
    )
  }, [pathname])

  return (
    <div className='w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-2 md:gap-2'>
      <div className='md:w-[250px] max-w-screen md:h-[calc(100vh-1rem)]'>
        <Card className='w-[calc(100vw-1rem)] md:w-auto mt-2 md:mt-0 md:h-full flex items-stretch justify-start'>
          <CardBody className=' overflow-x-auto'>
            <Tabs
              onSelectionChange={(s) => onSelectionChange(s)}
              placement={windowWidth && windowWidth > 768 ? 'start' : 'top'}
              aria-label='Tabs'
              fullWidth
              variant='light'
              selectedKey={selectedKey}
            >
              <Tab key='/admin-area/dashboard' className='text-left' title='Podsumowanie' />
              <Tab key='/admin-area/dashboard/calendar' className='text-left' title='Kalendarz' />
              <Tab key='/admin-area/dashboard/reservations' className='text-left' title='Rezerwacje' />
              <Tab key='/admin-area/dashboard/products' className='text-left' title='Produkty' />
            </Tabs>
          </CardBody>
          <Spacer />
          <Divider className='hidden md:block' />
          <div className='m-4 hidden md:block'>
            <Button className='w-full' onClick={() => logout()}>
              Wyloguj się
            </Button>
          </div>
        </Card>
      </div>
      <div className='w-[calc(100vw-1rem)] md:w-[calc(100vw-250px-1.5rem)] h-[calc(100vh-1rem)] '>
        <Card className='h-[calc(100vh-5.5rem)] md:h-[calc(100vh-1rem)]'>{children}</Card>
      </div>
    </div>
  )
}
