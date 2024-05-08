'use client';

import {Card, CardBody, Input, Modal, ModalContent, ModalHeader, Spinner, useDisclosure} from "@nextui-org/react";
import {useAdminStore} from "@/store/adminStore";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {MaterialSymbol} from "react-material-symbols";
import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {deleteCategory} from "@/app/actions/category";

export default function Category({params}: {params: {categoryId: string}}) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const categories = useAdminStore(state => state.categories);
  const fetchCategories = useAdminStore(state => state.fetchCategories);
  const [category, setCategory] = useState<any>({loading: true});
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    console.log(categories);
    if (categories[0] === 'loading') {
      fetchCategories().then(() => {
        const cat = categories.find(cat => cat.id === params.categoryId);
        if (cat) {
          setCategory(cat);
        }
      });
    } else if (Array.isArray(categories)) {
      const cat = categories.find(cat => cat.id == params.categoryId);
      console.log(cat)
      if (cat) {
        setCategory(cat);
        setName(cat.name);
        setDescription(cat.description);
        setIcon(cat.icon);
      }
    } else {
      router.push('/error/500');
    }
  }, [categories, fetchCategories, params.categoryId, router]);

  function handleReject() {
    setEditMode(false);
    setName(category.name);
    setDescription(category.description);
    setIcon(category.icon);
  }

  async function handleDelete() {
    const response = await deleteCategory(category.id)
    if (response.message === 'SUCCESS') {
      router.push('/admin-area/dashboard/products/categories');
    } else {

    }
  }

  return (
    <div className='flex align-center justify-center'>
      {
        category && !category.loading ? (
          <Card className='max-w-[450px] w-full mt-4'>
            <CardBody className='flex flex-row bg-white bg-opacity-5'>
              <div className='bg-primary bg-opacity-20 flex flex-row items-center justify-center min-w-14 min-h-12 rounded-xl'>
                <MaterialSymbol icon={icon as any} size={40} color='#006FEE'/>
              </div>
              <div className='flex flex-col gap-2 w-full pl-4'>
                <Input onChange={(e) => setName(e.target.value)} label='Nazwa' variant='faded' value={name} disabled={!editMode} className='w-full'/>
              </div>
            </CardBody>
            <CardBody className='bg-white bg-opacity-5 gap-4'>
              <Textarea onChange={(e) => setDescription(e.target.value)} label='Opis' variant='faded' value={description} disabled={!editMode} className='w-full'/>
              <Input onChange={(e) => setIcon(e.target.value)} label='Ikonka' variant='faded' value={icon} disabled={!editMode} className='w-full'/>
            </CardBody>
            <CardBody className='bg-white bg-opacity-5 flex flex-row gap-2'>
              <Button color={editMode ? 'danger' : 'default'} onClick={editMode ? () => onOpen() : router.back}>
                <MaterialSymbol icon={editMode ? 'delete' : 'arrow_back'} size={24}/>
              </Button>
              <Button className='w-full' onClick={() => setEditMode(!editMode)} color={editMode ? 'primary' : 'default'}>
                {editMode ? 'Zapisz' : 'Edytuj'}
              </Button>
            </CardBody>
          </Card>
        ) : categories[0] == 'loading' ? (
          <div className='flex flex-col gap-2 mt-6'>
            <Spinner/>
            <div>Ładowanie...</div>
          </div>
        ) : 'Nie znaleziono kategorii'
      }

      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Czy na pewno chcesz usunąć kategorię?</ModalHeader>
              <CardBody className='flex flex-col gap-2'>
                <div>
                  Jesteś pewien, że chcesz usunąć kategorię <strong>{category.name}</strong>? Tej operacji nie można cofnąć.
                </div>
                <div className='flex flex-row gap-2'>
                  <Button className='w-full' onClick={onClose} color='default'>Anuluj</Button>
                  <Button className='w-full' onClick={() => {deleteCategory(category.id)}} color='danger'>Usuń</Button>
                </div>
              </CardBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}