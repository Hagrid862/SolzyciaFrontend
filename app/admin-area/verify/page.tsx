'use client'

import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react'
import React, { useState, createRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyOtp } from '@/app/actions/auth'
import { useAdminStore } from '@/store/adminStore'

export default function VerifyPage() {
  const router = useRouter()
  const adminStore = useAdminStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number>(0)

  const [otp, setOtp] = useState(Array(8).fill('')) // Create an array of 8 state variables
  const inputRefs = Array(8)
    .fill(0)
    .map((_, i) => createRef<HTMLInputElement>())

  const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = [...otp]
    if (e.target.value !== '' && !/^[0-9]$/.test(e.target.value)) {
      return
    }
    newOtp[index] = e.target.value
    setOtp(newOtp)

    if (e.target.value !== '') {
      if (index < 7) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }
  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '' && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }
  const handleVerify = async (event: React.FormEvent) => {
    const otpValue = otp.join('')
    if (otpValue.length < 8) {
      setError(1)
      return
    }
    setLoading(true)

    event.preventDefault()

    const response = await adminStore.verifyOtp(otpValue)

    if (response.isSuccess) {
      router.push('admin-area/dashboard')
    } else {
      if (response.status === 'INVALID') {
        setLoading(false)
        setError(2)
        return
      } else {
        setLoading(false)
        setError(3)
        return
      }
    }
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <Card>
        <CardHeader>Weryfikacja dwuetapowa</CardHeader>
        <Divider />
        <CardBody>
          <div className='flex flex-row'>
            {otp.map((value, index) => (
              <Input
                className='max-w-8 mx-1'
                key={index}
                type='text'
                value={value}
                onChange={handleInputChange(index)}
                onKeyDown={handleKeyDown(index)}
                maxLength={1}
                isInvalid={error !== 0}
                style={{ width: '30px', marginRight: '5px' }}
                ref={inputRefs[index]}
              />
            ))}
          </div>
          <div className={`mt-2 text-xs text-opacity-50'} ${error !== 0 ? 'text-danger' : ''}`}>
            {error === 0
              ? 'Wpisz kod wysłany na twojego maila.'
              : error === 1
                ? 'Wypełnij wszystkie pola!'
                : error === 2
                  ? 'Wprowadzony kod jest niepoprawny.'
                  : 'Wystąpił błąd, spróbuj odświeżyć stronę.'}
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <Button isLoading={loading} onClick={handleVerify} color='primary'>
            Zweryfikuj
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
