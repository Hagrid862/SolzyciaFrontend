'use client';

import React, {useEffect, useRef, useState} from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Select,
  SelectItem,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea, Spinner, image
} from "@nextui-org/react";
import {MaterialSymbol} from "react-material-symbols";
import {useAdminStore} from "@/store/adminStore";

export default function AddProductObjectPage() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');

  const [err, setErr] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const fileInputs = useRef<(HTMLInputElement | null)[]>([]);

  const fetchCategories = useAdminStore(state => state.fetchCategories);
  const categories = useAdminStore(state => state.categories);
  const addProduct = useAdminStore(state => state.addProduct);

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleTagFieldKeyPress(e: any) {
    if (e.key == 'Enter') {
      var tag = e.target.value;
      if (tag.length > 0) {
        if (tags.includes(tag)) {
          return;
        }
        setTags([...tags, tag]);
        setTag('');
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (file) {
      const newPhotos = [...photos];
      newPhotos[index] = file;
      setPhotos(newPhotos);
    }
  }

  function handleCardClick(index: number) {
    fileInputs.current[index]?.click();
  }

  async function handleSubmit() {

    console.log({
      name: name,
      price: price,
      description: description,
      title: title,
      category: category,
      tags: tags,
      photos: photos
    })

    var images: File[] = []

    photos.map((val, index) => {
      if (val) {
        images.push(val);
      }
    })

    if (images.length > 0) {
      setPhotos(images)
    } else {
      setPhotos([])
    }

    if (name === '') {
      setErr(1)
      return;
    } else if (price === 0) {
      setErr(2)
      return;
    } else if (description === '') {
      setErr(3)
      return;
    } else if (description.length < 50) {
      setErr(4)
      return;
    }
    setErr(0)
    setStatus('loading')
    setShowModal(true)

    const response = await addProduct(name, price, description, title === '' ? undefined : title, category === '' ? undefined : category, tags.length === 0 ? undefined : tags, !photos[0] ? undefined : photos);

    console.log(response);

  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {[...Array(6)].map((_, index) => (
            <React.Fragment key={index}>
              <input
                type="file"
                ref={(el) => {
                  fileInputs.current[index] = el;
                }}
                style={{display: 'none'}}
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
              />
              <Card
                className='aspect-square w-full bg-white bg-opacity-5 hover:bg-opacity-20'
                onClick={() => handleCardClick(index)}
                isPressable
              >
                {
                  photos[index] ? (
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                      <Image src={photos[index] ? URL.createObjectURL(photos[index]) : ''} alt={'obraz ' + index}/>
                    </div>
                    ) : (
                    <CardBody className='flex items-center justify-center'>
                      <MaterialSymbol icon={'add_a_photo'} size={40} color='#006FEE'/>
                    </CardBody>
                  )
                }
              </Card>
            </React.Fragment>
          ))}
        </div>
        <Input label='Nazwa przedmiotu' description='wpisz tu krótką i czytelną nazwę przemiotu, np. "iPhone 14 pro"'
               isRequired value={name} onChange={(e) => setName(e.target.value)} isInvalid={err === 1}
               errorMessage={err === 1 ? 'Nazwa przedmiotu jest wymagana!' : ''}/>
        <Input label='Tytuł ogłoszenia'
               description='wpisz tu dłuższą wersje nazwy, możesz dodać rzeczy takie jak parametry przedmiotu, wielkość itp. np. "iPhone 14 pro 256gb czarny"'
               value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Input label='Cena (PLN)' type='number' isRequired value={price.toString()}
               onChange={(e) => setPrice(Number.parseFloat(e.target.value))} isInvalid={err === 2}
               errorMessage={err === 3 ? 'Cena przedmiotu musi być większa od 0!' : ''}/>
        <Textarea label='Opis przedmiotu' isRequired value={description}
                  onChange={(e) => setDescription(e.target.value)} isInvalid={err === 3 || err === 4}
                  errorMessage={err === 3 ? 'Opis przedmiotu jest wymagany!' : err == 4 ? 'Opis musi mieć conajmniej 50 znaków' : ''}/>
        <Select label='kategoria' onChange={(e) => setCategory(e.target.value)}>
          {
            categories.map((category, index) => (
              <SelectItem key={index} value={category.id}
                          startContent={<MaterialSymbol icon={category.icon} size={20} color={'#006FEE'}/>}>
                {category.name}
              </SelectItem>
            ))
          }
        </Select>
        <Input label='Tagi'
               onKeyDown={(e) => handleTagFieldKeyPress(e)}
               value={tag} onChange={(e) => setTag(e.target.value)}
               description='Tagi pomagają kupującym znaleźć ten produkt, którego szukają. wpisz tu cechy produktu, np. "telefon, iPhone, apple"'/>
        <div className='w-full p-2 bg-white text-sm rounded-xl bg-opacity-0'>
          {tags.length > 0 ? tags.map((tagVal, index) => (
            <Chip key={index} className='m-1' onClose={() => setTags(tags.filter((tag, i) => i !== index))}>
              {tagVal}
            </Chip>
          )) : 'Brak tagów.'}
        </div>

        <Button color='primary' onClick={() => handleSubmit()}>Dodaj produkt</Button>
      </div>
      <Modal isOpen={showModal} backdrop='blur' onClose={() => setShowModal(false)}>
        <ModalContent>
          {
            status === 'loading' ? (
              <ModalBody>
                <div className='flex flex-col items-center justify-center gap-4 py-6'>
                  <Spinner size='lg'/>
                  <span className='text-xl font-semibold'>Dodawanie przedmiotu...</span>
                </div>
              </ModalBody>
            ) : null
          }
          {
            status === 'success' ? (
              <ModalBody>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <MaterialSymbol icon='done' size={64} color='#006FEE'/>
                  <span className='text-xl font-semibold'>Przedmiot dodany pomyślnie!</span>
                  <span className='text-sm'>Twój przedmiot został dodany do bazy danych i jest już dostępny na stronie.</span>
                  <Button color='success' onClick={() => setShowModal(false)}>Zamknij</Button>
                </div>
              </ModalBody>
            ) : null
          }
          {
            status === 'error' ? (
              <ModalBody>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <MaterialSymbol icon='error' size={64} color='#FF0000'/>
                  <span className='text-xl font-semibold'>Wystąpił błąd podczas dodawania przedmiotu!</span>
                  <span className='text-sm'>Spróbuj ponownie później.</span>
                  <Button color='danger' onClick={() => setShowModal(false)}>Zamknij</Button>
                </div>
              </ModalBody>
            ) : null
          }
        </ModalContent>
      </Modal>
    </>
  )
}