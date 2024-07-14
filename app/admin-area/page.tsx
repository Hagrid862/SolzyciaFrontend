'use client'

import { Button, Card, CardBody, CardHeader, Checkbox, Divider, Input, Link } from '@nextui-org/react'
import { useFormState } from 'react-dom'
import { login } from '@/app/actions/auth'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/store/adminStore'
import { setegid } from 'process'

export default function AdminAreaPage() {
  const router = useRouter()
  const adminStore = useAdminStore()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<number>(0)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)

  async function handleLogin() {
    setError(0)
    if (username === '' || username.length < 3) {
      setError(1)
      return
    } else if (password === '' || password.length < 8) {
      setError(2)
      return
    }

    const result = await adminStore.login(username, password, remember)
    if (result.isSuccess && result.status === '2FASENT') {
      router.push('/admin-area/verify')
    } else {
      if (result.status === 'INVALID') {
        setError(3)
      } else {
        setError(4)
      }
    }
  }

  return (
    <div className='w-[100vw - 2rem] h-screen flex items-center justify-center m-4 md:m-0'>
      <Card className='w-full md:w-[400px]'>
        <CardHeader>
          <h1>Zaloguj się do panelu administratora</h1>
        </CardHeader>
        <Divider />
        <CardBody className='flex flex-col gap-2'>
          <Input
            errorMessage={error === 1 ? 'Nazwa użytkownika jest niepoprawna' : ''}
            isInvalid={error === 1 || error === 3 || error === 4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label='Nazwa użytkownika'
          />
          <Input
            errorMessage={
              error === 2
                ? 'Hasło jest niepoprawne'
                : error === 3
                  ? 'Niepoprawne dane logowania'
                  : error === 4
                    ? 'Wystąpił błąd'
                    : ''
            }
            isInvalid={error === 2 || error === 3 || error === 4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Hasło'
            type='password'
          />
          <Checkbox isSelected={remember} onValueChange={(v) => setRemember(v)}>
            Zapamiętaj mnie
          </Checkbox>
          <Button onClick={handleLogin} color='primary' isLoading={loading}>
            Zaloguj
          </Button>
        </CardBody>
        <Divider />
        <CardBody>
          <Link href='/admin-area/forgot-password'>Resetuj hasło</Link>
        </CardBody>
      </Card>
    </div>
  )
}
