'use client'

import {Button, Card, CardBody, Input, Link, Modal} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {createCategory} from "@/store/slices/adminSlice";

export default function AddCategoriesPage() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  const [status, setStatus] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const actionError = useSelector((state: RootState) => state.admin.error);

  async function handleAddCategory() {
    try {
      console.log('start')
      setStatus('loading');

      if (name == '' || description == '' || icon == '') {
        setStatus('Wypełnij wszystkie pola');
        return;
      }

      const response = await dispatch(createCategory({name, icon, description}));

      if (createCategory.fulfilled.match(response)) {
        if (actionError != null) {
          setStatus(actionError.message);
          return;
        }
        setStatus('success');
        return;
      } else {
        setStatus(actionError?.message ?? 'Nieznany błąd, spróbuj ponownie później.');
        return;
      }

      setStatus("success");
    } catch (e: any) {
      setStatus(e.message);
    }
  }

  return (
    <>
      <div>
        <div className='text-xl'>Dodaj kategorie</div>
        <div className='text-sm text-red-600'>{status}</div>
        <Card className='w-full mt-4 bg-white bg-opacity-5'>
          <CardBody className='flex flex-col gap-4'>
            <Input value={name} onChange={(e) => setName(e.target.value)} label='Nazwa kategorii' variant='underlined'/>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} label='Opis' variant='underlined'/>
            <Input value={icon} onChange={(e) => setIcon(e.target.value)} label='Ikonka' variant='underlined'/>
            <div className='flex flex-row'>
              <span>zobacz dostępne ikony na&nbsp; </span><Link target='_blank' href='https://fonts.google.com/icons'>Ikonach
              Google</Link>
            </div>
          </CardBody>
        </Card>
        <Button className='mt-4 w-full' color='primary' variant='solid' onClick={async () => await handleAddCategory()}>Dodaj kategorie</Button>
      </div>
      <Modal isOpen={status != ''}>
asd
      </Modal>
    </>
  )
}