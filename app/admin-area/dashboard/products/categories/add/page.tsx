'use client'

import { Button, Card, CardBody, Input, Link, Modal } from '@nextui-org/react'
import { Textarea } from '@nextui-org/input'
import { useEffect, useState } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { useFormState } from 'react-dom'
import { CreateCategoryFormSchema } from '@/app/lib/definitions'
import { createCategory } from '@/app/actions/category'
import { useRouter } from 'next/navigation'

export default function AddCategoriesPage() {
  const [state, action] = useFormState(createCategory, undefined)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [icon, setIcon] = useState<string>('')

  const [status, setStatus] = useState<string>('')

  async function handleAddCategory() {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('icon', icon)

      action(formData)
    } catch (e: any) {
      setStatus(e.message)
    }
  }

  useEffect(() => {
    setLoading(false)
    console.log(state)
    if (state?.message === 'SUCCESS') {
      router.push('/admin-area/dashboard/products/categories')
    }
  }, [state])

  return (
    <>
      <div>
        <div className='text-xl'>Dodaj kategorie</div>
        <div className='text-sm text-red-600'>{status}</div>
        <Card className='w-full mt-4 bg-white bg-opacity-5'>
          <CardBody className='flex flex-col gap-4'>
            <Input
              variant='faded'
              isInvalid={
                state?.errors?.name !== undefined || (state?.message !== undefined && state.message !== 'SUCCESS')
              }
              errorMessage={state?.errors?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label='Nazwa kategorii'
            />
            <Textarea
              variant='faded'
              isInvalid={
                state?.errors?.description !== undefined ||
                (state?.message !== undefined && state.message !== 'SUCCESS')
              }
              errorMessage={state?.errors?.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label='Opis'
            />
            <Input
              variant='faded'
              isInvalid={
                state?.errors?.icon !== undefined || (state?.message !== undefined && state.message !== 'SUCCESS')
              }
              errorMessage={state?.errors?.icon}
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              label='Ikonka'
            />
            <div className='text-[#f31260] text-sm'>{state?.message}</div>
            <div className='flex flex-row'>
              <span>zobacz dostępne ikony na&nbsp; </span>
              <Link target='_blank' href='https://fonts.google.com/icons'>
                Ikonach Google
              </Link>
            </div>
          </CardBody>
        </Card>
        <Button className='mt-4 w-full' color='primary' variant='solid' onClick={async () => await handleAddCategory()}>
          Dodaj kategorie
        </Button>
      </div>
      <Modal isOpen={status != ''}>asd</Modal>
    </>
  )
}
