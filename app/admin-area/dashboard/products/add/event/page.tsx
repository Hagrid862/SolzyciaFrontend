'use client'

import {
  Accordion,
  AccordionItem,
  CalendarDate,
  Card,
  CardBody,
  Chip,
  DatePicker,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spacer,
  Spinner,
  TimeInput
} from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialSymbol } from 'react-material-symbols'
import { parseAbsoluteToLocal, parseDate, parseTime, Time, ZonedDateTime } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import { set } from 'zod'
import { Textarea } from '@nextui-org/input'
import { useAdminStore } from '@/store/adminStore'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error
import { EventLocation } from '@/models/EventLocation'
import { EventLocationWithoutId } from '@/models/EventLocationWithoutId'

export default function AddEventPage() {
  const [photos, setPhotos] = useState<File[]>([])
  const [name, setName] = useState<string>('')
  const [duration, setDuration] = useState<number>(0)
  const [customDuration, setCustomDuration] = useState<number>(0)
  const [dates, setDates] = useState<{ date: Date; seats: number; location: EventLocationWithoutId }[]>([])
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState<string>('')

  const [editDate, setEditDate] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<{
    date: Date
    seats: number
    location: EventLocationWithoutId
  } | null>(null)

  const [status, setStatus] = useState<string>('')
  const [err, setErr] = useState<number>(0)

  const fileInputs = useRef<(HTMLInputElement | null)[]>([])

  const fetchCategories = useAdminStore((state) => state.fetchCategories)
  const categories = useAdminStore((state) => state.categories)
  const addEvent = useAdminStore((state) => state.addEvent)

  useEffect(() => {
    fetchCategories()
  }, [])

  function handleTagFieldKeyPress(e: any) {
    if (e.key == 'Enter') {
      var tag = e.target.value
      if (tag.length > 0) {
        if (tags.includes(tag)) {
          return
        }
        setTags([...tags, tag])
        setTag('')
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0]
    if (file) {
      const newPhotos = [...photos]
      newPhotos[index] = file
      setPhotos(newPhotos)
    }
  }

  function handleCardClick(index: number) {
    fileInputs.current[index]?.click()
  }

  const toCalendarDate = (date: Date) => {
    return parseDate(date.toISOString().split('T')[0])
  }

  const handleAddDate = () => {
    const date = new Date()

    date.setMilliseconds(0)
    date.setSeconds(0)

    setDates([
      ...dates,
      {
        date,
        seats: 1,
        location: {
          Street: '', // Provide appropriate default value
          HouseNumber: '', // Provide appropriate default value
          PostalCode: '', // Provide appropriate default value
          City: '', // Provide appropriate default value
          AdditionalInfo: '' // Provide appropriate default value
        }
      }
    ])
  }

  const handleChangeDate = (date: CalendarDate) => {
    const dateObj = new Date(date.toString())
    setSelectedDate((prev) => (prev ? { ...prev, date: dateObj } : null))
  }

  const handleTimeChange = (time: Time) => {
    setSelectedDate((prev) => {
      if (!prev) return null
      const updatedDate = new Date(prev.date)
      updatedDate.setHours(time.hour, time.minute)
      return { ...prev, date: updatedDate }
    })
  }

  const handleSeatsChange = (value: string) => {
    const seats = Number.parseInt(value)
    if (!Number.isNaN(seats) && seats > 0) {
      setSelectedDate((prev) => (prev ? { ...prev, seats } : null))
    }
  }

  const handleDateSave = () => {
    if (selectedDate) {
      const newDates = dates
      newDates[editDate!] = selectedDate
      setDates(newDates)
      setEditDate(null)
    }
  }

  const handleSubmit = async () => {
    var images: File[] = []

    photos.map((val, index) => {
      if (val) {
        images.push(val)
      }
    })

    if (images.length > 0) {
      setPhotos(images)
    } else {
      setPhotos([])
    }

    if (name === '') {
      setErr(1)
      return
    } else if (duration === 0) {
      setErr(2)
      return
    } else if (description === '') {
      setErr(3)
      return
    } else if (description.length < 50) {
      setErr(6)
      return
    } else if (dates.length === 0) {
      setErr(4)
      return
    } else if (price === 0) {
      setErr(5)
      return
    }

    setErr(0)
    setStatus('loading')
    const response = await addEvent(
      name,
      price,
      description,
      duration === -1 ? customDuration : duration,
      dates,
      category,
      tags,
      images
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
        {[...Array(6)].map((_, index) => (
          <React.Fragment key={index}>
            <input
              type='file'
              ref={(el) => {
                fileInputs.current[index] = el
              }}
              style={{ display: 'none' }}
              accept='image/*'
              onChange={(e) => handleFileChange(e, index)}
            />
            <Card
              className='aspect-square w-full bg-white bg-opacity-5 hover:bg-opacity-20'
              onClick={() => handleCardClick(index)}
              isPressable
            >
              {photos[index] ? (
                <div className='w-full h-full flex flex-col items-center justify-center'>
                  <Image src={photos[index] ? URL.createObjectURL(photos[index]) : ''} alt={'obraz ' + index} />
                </div>
              ) : (
                <CardBody className='flex items-center justify-center'>
                  <MaterialSymbol icon={'add_a_photo'} size={40} color='#006FEE' />
                </CardBody>
              )}
            </Card>
          </React.Fragment>
        ))}
      </div>
      <Input
        label='Nazwa wydażenia'
        value={name}
        onChange={(e) => setName(e.target.value)}
        isInvalid={err === 1}
        errorMessage={err === 1 ? 'Nazwa wydarzenia jest wymagana' : ''}
      />
      <Select
        label='Czas trwania'
        onChange={(e) => setDuration(Number.parseInt(e.target.value))}
        isInvalid={err === 2}
        errorMessage={err == 2 ? 'Musisz wybrać czas trwania Wydarzenia lub wprowadzić własny' : ''}
      >
        <SelectItem key={15} value={15} textValue={'15'}>
          15 minut
        </SelectItem>
        <SelectItem key={30} value={30} textValue={'30'}>
          30 minut
        </SelectItem>
        <SelectItem key={45} value={45} textValue={'45'}>
          45 minut
        </SelectItem>
        <SelectItem key={60} value={60} textValue={'60'}>
          1 godzina
        </SelectItem>
        <SelectItem key={90} value={90} textValue={'90'}>
          1,5 godziny
        </SelectItem>
        <SelectItem key={120} value={120} textValue={'120'}>
          2 godziny
        </SelectItem>
        <SelectItem key={180} value={180} textValue={'180'}>
          3 godziny
        </SelectItem>
        <SelectItem key={240} value={240} textValue={'240'}>
          4 godziny
        </SelectItem>
        <SelectItem key={300} value={300} textValue={'300'}>
          5 godzin
        </SelectItem>
        <SelectItem key={360} value={360} textValue={'360'}>
          6 godzin
        </SelectItem>
        <SelectItem key={420} value={420} textValue={'420'}>
          7 godzin
        </SelectItem>
        <SelectItem key={480} value={480} textValue={'480'}>
          8 godzin
        </SelectItem>
        <SelectItem key={600} value={600} textValue={'600'}>
          10 godzin
        </SelectItem>
        <SelectItem key={720} value={720} textValue={'720'}>
          12 godzin
        </SelectItem>
        <SelectItem key={960} value={960} textValue={'960'}>
          16 godzin
        </SelectItem>
        <SelectItem key={1440} value={1440} textValue={'1440'}>
          1 doba
        </SelectItem>
        <SelectItem key={2880} value={2880} textValue={'2880'}>
          2 doby
        </SelectItem>
        <SelectItem key={4320} value={4320} textValue={'4320'}>
          3 doby
        </SelectItem>
        <SelectItem key={5760} value={5760} textValue={'5760'}>
          4 doby
        </SelectItem>
        <SelectItem key={-1} value={-1} textValue={'-1'}>
          Własne
        </SelectItem>
      </Select>
      {duration === -1 && (
        <Input
          label='Własny czas trwania (w minutach)'
          type='number'
          min={5}
          max={20160}
          isInvalid={err == 2}
          onChange={(e) => setCustomDuration(Number.parseInt(e.target.value))}
        />
      )}
      <Textarea
        label='Opis wydarzenia'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        isInvalid={err == 6 || err == 3}
        errorMessage={err == 6 ? 'Opis musi posiadać minimum 50 znaków' : err == 3 ? 'opis jest wymagany' : ''}
      />
      <Card shadow='none'>
        <CardBody className='bg-white bg-opacity-5'>
          <Card className='flex flex-row' radius='sm' isPressable onPress={handleAddDate}>
            <CardBody className='bg-primary bg-opacity-15 w-16'>
              <MaterialSymbol icon={'calendar_add_on'} size={40} color='#006FEE' />
            </CardBody>
            <Divider orientation='vertical' className='h-16' />
            <CardBody className='flex justify-center h-16'>
              <div className='text-xl font-semibold'>Dodaj datę wydarzenia</div>
            </CardBody>
          </Card>
        </CardBody>
        <Divider />
        <CardBody className='bg-white bg-opacity-5'>
          {dates.length == 0 ? (
            <div className={err == 4 ? 'text-red-600' : ''}>
              Wymagana jest minimum jedna data kiedy wydarzenie sie odbywa.
            </div>
          ) : (
            <div className='flex flex-col gap-2 max-h-[250px]'>
              {dates.map((date, index) => (
                <Card
                  key={index}
                  isPressable
                  isHoverable
                  onPress={() => {
                    setEditDate(index)
                    setSelectedDate(dates[index])
                  }}
                  radius='sm'
                  className='min-h-[72px]'
                >
                  <CardBody>
                    <div className='flex flex-row justify-between'>
                      <div className='text-small'>
                        <div className='font-semibold'>Data:</div>
                        {date.date.toLocaleDateString()}
                      </div>
                      <div className='text-sm'>
                        <div className='font-semibold'>Godzina:</div>
                        {date.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div>
                        <div className='font-semibold'>Miejsca:</div>
                        {date.seats}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
      <Input
        label='Cena'
        type='number'
        onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
        isInvalid={err == 5}
        errorMessage={err == 5 ? 'Cena jest wymagana' : ''}
      />
      <Select label='kategoria' onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category, index) => (
          <SelectItem
            key={index}
            value={category.id}
            textValue={category.id}
            startContent={<MaterialSymbol icon={category.icon} size={20} color={'#006FEE'} />}
          >
            {category.name}
          </SelectItem>
        ))}
      </Select>
      <Input
        label='Tagi'
        onKeyDown={(e) => handleTagFieldKeyPress(e)}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        description='Tagi pomagają kupującym znaleźć ten produkt, którego szukają. wpisz tu cechy produktu, np. "telefon, iPhone, apple"'
      />
      <div className='w-full p-2 bg-white text-sm rounded-xl bg-opacity-0'>
        {tags.length > 0
          ? tags.map((tagVal, index) => (
              <Chip key={index} className='m-1' onClose={() => setTags(tags.filter((tag, i) => i !== index))}>
                {tagVal}
              </Chip>
            ))
          : 'Brak tagów.'}
      </div>
      <Button color='primary' onClick={() => handleSubmit()}>
        Dodaj wydarzenie
      </Button>

      <Modal
        hideCloseButton
        isDismissable={false}
        isOpen={editDate !== null}
        onClose={() => setEditDate(null)}
        backdrop='blur'
      >
        <ModalContent>
          <ModalHeader>Edytuj datę wydarzenia</ModalHeader>
          <Divider />
          <ModalBody>
            <div>
              <DatePicker
                label='Data'
                labelPlacement='outside'
                value={selectedDate ? toCalendarDate(selectedDate!.date) : null}
                onChange={handleChangeDate}
                minValue={toCalendarDate(new Date())}
              />
              <div className='text-xs text-[#777] mt-1'>Data kiedy wydarzenie sie rozpocznie.</div>
            </div>
            <div>
              <TimeInput
                label='Godzina'
                labelPlacement='outside'
                hideTimeZone
                hourCycle={24}
                onChange={handleTimeChange}
                value={
                  selectedDate
                    ? parseTime(
                        selectedDate?.date.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })
                      )
                    : undefined
                }
              />
              <div className='text-xs text-[#777] mt-1'>Godzina kiedy wydarzenie sie rozpocznie.</div>
            </div>
            <div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm'>Ilość miejsc</span>
                <div className='flex flex-row justify-start align-bottom gap-2'>
                  <Button
                    isIconOnly
                    onClick={() =>
                      selectedDate && selectedDate.seats > 1
                        ? setSelectedDate({
                            ...selectedDate,
                            seats: selectedDate.seats - 1
                          })
                        : null
                    }
                  >
                    <MaterialSymbol icon='remove' size={24} color='#FFF' />
                  </Button>
                  <Input
                    type='text'
                    value={selectedDate ? selectedDate!.seats.toString() : undefined}
                    onChange={(e) => handleSeatsChange(e.target.value)}
                  />
                  <Button
                    isIconOnly
                    onClick={() =>
                      selectedDate
                        ? setSelectedDate({
                            ...selectedDate,
                            seats: selectedDate.seats + 1
                          })
                        : null
                    }
                  >
                    <MaterialSymbol icon='add' size={24} color='#FFF' />
                  </Button>
                </div>
              </div>
              <div className='text-xs text-[#777] mt-1'>Ilość osób które będą mogły kupić to wydarzenie.</div>
            </div>
            <Accordion variant='shadow' className='bg-opacity-5 bg-white'>
              <AccordionItem key='1' aria-label='location' title='Lokalizacja wydarzenia'>
                <div>Dodaj lokalizacje wydarzenia aby kupujący odrazu wiedział gdzie się stawić</div>
                <Divider className='my-2' />
                <div className='flex flex-col gap-2'>
                  <Input
                    label='Miasto'
                    variant='faded'
                    isRequired
                    value={selectedDate?.location?.City ?? ''}
                    onChange={(e) =>
                      setSelectedDate((prev) => {
                        if (!prev) return null // Handle the case where prev is null
                        return {
                          ...prev,
                          location: {
                            ...prev.location,
                            City: e.target.value,
                            // Ensure all other properties are provided
                            Street: prev.location.Street ?? '',
                            HouseNumber: prev.location.HouseNumber ?? '',
                            PostalCode: prev.location.PostalCode ?? '',
                            AdditionalInfo: prev.location.AdditionalInfo ?? ''
                          },
                          date: prev.date, // Ensure date is always provided
                          seats: prev.seats // Ensure seats is always provided
                        }
                      })
                    }
                  />
                  <Input
                    label='Ulica'
                    variant='faded'
                    isRequired
                    value={selectedDate?.location?.Street ?? ''}
                    onChange={(e) =>
                      setSelectedDate((prev) => {
                        if (!prev) return null // Handle the case where prev is null
                        return {
                          ...prev,
                          location: {
                            ...prev.location,
                            Street: e.target.value,
                            // Ensure all other properties are provided
                            HouseNumber: prev.location.HouseNumber ?? '',
                            PostalCode: prev.location.PostalCode ?? '',
                            City: prev.location.City ?? '',
                            AdditionalInfo: prev.location.AdditionalInfo ?? ''
                          },
                          date: prev.date, // Ensure date is always provided
                          seats: prev.seats // Ensure seats is always provided
                        }
                      })
                    }
                  />
                  <Input
                    label='Kod pocztowy'
                    variant='faded'
                    isRequired
                    value={selectedDate?.location?.PostalCode ?? ''}
                    onChange={(e) =>
                      setSelectedDate((prev) => {
                        if (!prev) return null // Handle the case where prev is null
                        return {
                          ...prev,
                          location: {
                            ...prev.location,
                            PostalCode: e.target.value,
                            // Ensure all other properties are provided
                            Street: prev.location.Street ?? '',
                            HouseNumber: prev.location.HouseNumber ?? '',
                            City: prev.location.City ?? '',
                            AdditionalInfo: prev.location.AdditionalInfo ?? ''
                          },
                          date: prev.date, // Ensure date is always provided
                          seats: prev.seats // Ensure seats is always provided
                        }
                      })
                    }
                  />
                  <Input
                    label='Numer budynku'
                    variant='faded'
                    isRequired
                    value={selectedDate?.location?.HouseNumber ?? ''}
                    onChange={(e) =>
                      setSelectedDate((prev) => {
                        if (!prev) return null // Handle the case where prev is null
                        return {
                          ...prev,
                          location: {
                            ...prev.location,
                            HouseNumber: e.target.value,
                            // Ensure all other properties are provided
                            Street: prev.location.Street ?? '',
                            PostalCode: prev.location.PostalCode ?? '',
                            City: prev.location.City ?? '',
                            AdditionalInfo: prev.location.AdditionalInfo ?? ''
                          },
                          date: prev.date, // Ensure date is always provided
                          seats: prev.seats // Ensure seats is always provided
                        }
                      })
                    }
                  />
                  <Textarea
                    label='Dodatkowe informacje'
                    variant='faded'
                    value={selectedDate?.location?.AdditionalInfo ?? ''}
                    onChange={(e) =>
                      setSelectedDate((prev) => {
                        if (!prev) return null // Handle the case where prev is null
                        return {
                          ...prev,
                          location: {
                            ...prev.location,
                            AdditionalInfo: e.target.value,
                            // Ensure all other properties are provided
                            Street: prev.location.Street ?? '',
                            HouseNumber: prev.location.HouseNumber ?? '',
                            PostalCode: prev.location.PostalCode ?? '',
                            City: prev.location.City ?? ''
                          },
                          date: prev.date, // Ensure date is always provided
                          seats: prev.seats // Ensure seats is always provided
                        }
                      })
                    }
                  />
                </div>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <Divider />
          <ModalBody className='flex flex-row justify-between'>
            <Button color='danger' className='w-full' variant='flat' onClick={() => setEditDate(null)}>
              Anuluj
            </Button>
            <Spacer />
            <Button onClick={() => handleDateSave()} color='success' className='w-full' variant='flat'>
              Zapisz
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={status !== ''}
        backdrop='blur'
        onClose={() => setStatus('')}
        isDismissable={false}
        hideCloseButton={false}
      >
        <ModalContent>
          {status === 'loading' ? (
            <ModalBody>
              <div className='flex flex-col items-center justify-center gap-4 py-6'>
                <Spinner size='lg' />
                <span className='text-xl font-semibold'>Dodawanie przedmiotu...</span>
              </div>
            </ModalBody>
          ) : null}
          {status === 'success' ? (
            <ModalBody>
              <div className='flex flex-col items-center justify-center gap-4'>
                <MaterialSymbol icon='done' size={64} color='#006FEE' />
                <span className='text-xl font-semibold'>Przedmiot dodany pomyślnie!</span>
                <span className='text-sm'>
                  Twój przedmiot został dodany do bazy danych i jest już dostępny na stronie.
                </span>
                <Button color='success' onClick={() => setStatus('')}>
                  Zamknij
                </Button>
              </div>
            </ModalBody>
          ) : null}
          {status === 'error' ? (
            <ModalBody>
              <div className='flex flex-col items-center justify-center gap-4'>
                <MaterialSymbol icon='error' size={64} color='#FF0000' />
                <span className='text-xl font-semibold'>Wystąpił błąd podczas dodawania przedmiotu!</span>
                <span className='text-sm'>Spróbuj ponownie później.</span>
                <Button color='danger' onClick={() => setStatus('')}>
                  Zamknij
                </Button>
              </div>
            </ModalBody>
          ) : null}
        </ModalContent>
      </Modal>
    </div>
  )
}
