import Image from 'next/image'
import banner from '@/assets/images/survival/forrest-banner.jpg'
import nature from '@/assets/images/survival/nature.jpg'
import mountains from '@/assets/images/survival/mountains.jpg'
import equipment from '@/assets/images/survival/equipment.jpg'
import group from '@/assets/images/survival/group.jpg'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

export default function SurvivalPage() {
  return (
    <div className='w-full flex flex-col items-center justify-center relative'>
      <div className='h-[calc(100vh-64px)] relative w-full mb-12'>
        <Image src={banner} alt='offroad-jeep' className='w-full h-full' layout='fill' objectFit='cover' />
        <div className='relative w-full max-w-[1920px] h-full left-1/2 transform -translate-x-1/2'>
          <div className='absolute top-1/3 left-12'>
            <div className='md:text-6xl text-4xl lg:text-8xl font-bold '>Survival</div>
            <div className='md:text-xl text-lg lg:text-3xl font-semibold'>Przygotuj się na Wszystko.</div>
          </div>
        </div>
      </div>
      <div className='max-w-[1200px] w-full flex flex-col gap-8 px-2 md:px-0'>
        <div className='w-full flex flex-col md:flex-row gap-12 my-8 items-center'>
          <Image src={nature} alt='mountains-offroad' className='md:w-1/3 rounded-3xl' />
          <div className='flex flex-col h-full text-center md:text-left'>
            <div className='text-4xl font-bold mb-4'>Przetrwanie w Dzikiej Naturze</div>
            <div className='text-lg mt-4'>
              Naucz się przetrwać w dzikiej naturze i odkryj umiejętności, które pozwolą Ci radzić sobie w trudnych
              warunkach. Survival to sztuka przetrwania w miejscach, gdzie człowiek jest zdany na siebie i swoje
              zdolności. Z nami poznasz tajniki budowy schronienia, poszukiwania pożywienia oraz pozyskiwania wody.
              Dowiesz się, jak rozpalać ogień bez nowoczesnych narzędzi i jak orientować się w terenie, korzystając
              jedynie z naturalnych wskazówek. Przygoda w dziczy to nie tylko wyzwanie, ale także doskonała okazja do
              odkrycia swojej siły i niezależności. Przygotuj się na spotkanie z naturą w jej najczystszej formie i
              zyskaj pewność, że potrafisz przetrwać w każdych warunkach.
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row gap-12 my-8 items-center'>
          <div className='flex flex-col h-full text-center md:text-left'>
            <div className='text-4xl font-bold mb-4'>Adrenalina i Ekstremalne Wyzwania</div>
            <div className='text-lg mt-4'>
              Poczuj dreszcz emocji, stawiając czoła ekstremalnym wyzwaniom w terenie. Survival to nie tylko nauka
              przetrwania – to także testowanie swoich granic i mierzenie się z naturą. Nasze programy survivalowe pełne
              są emocjonujących zadań, które sprawią, że Twoje serce zacznie bić szybciej. Przeprawy przez rzeki,
              wspinaczka po stromych zboczach, a także pokonywanie dzikich ostępów to tylko niektóre z wyzwań, które na
              Ciebie czekają. Każde zadanie to szansa na odkrycie swojej odwagi, determinacji i umiejętności radzenia
              sobie w ekstremalnych warunkach. Dołącz do nas i przeżyj przygodę, która pozostawi niezatarte wspomnienia
              i pozwoli Ci poczuć prawdziwą adrenalinę.
            </div>
          </div>
          <Image src={mountains} alt='mountains-offroad' className='md:w-1/3 rounded-3xl order-first md:order-last' />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-12 my-8 items-center'>
          <Image src={group} alt='mountains-offroad' className='md:w-1/3 rounded-3xl' />
          <div className='flex flex-col h-full text-center md:text-left'>
            <div className='text-4xl font-bold mb-4'>Budowanie Zespołu i Współpraca</div>
            <div className='text-lg mt-4'>
              Naucz się przetrwać w dzikiej naturze i odkryj umiejętności, które pozwolą Ci radzić sobie w trudnych
              warunkach. Survival to sztuka przetrwania w miejscach, gdzie człowiek jest zdany na siebie i swoje
              zdolności. Z nami poznasz tajniki budowy schronienia, poszukiwania pożywienia oraz pozyskiwania wody.
              Dowiesz się, jak rozpalać ogień bez nowoczesnych narzędzi i jak orientować się w terenie, korzystając
              jedynie z naturalnych wskazówek. Przygoda w dziczy to nie tylko wyzwanie, ale także doskonała okazja do
              odkrycia swojej siły i niezależności. Przygotuj się na spotkanie z naturą w jej najczystszej formie i
              zyskaj pewność, że potrafisz przetrwać w każdych warunkach.
            </div>
          </div>
        </div>
        <div className='w-full mt-12 flex flex-col gap-12 my-8 items-center'>
          <Image src={equipment} alt='mountains-offroad' className='md:w-3/4 rounded-3xl' />
          <div className='flex flex-col h-full text-center'>
            <div className='text-4xl font-bold mb-4'>Umiejętności i Wiedza</div>
            <div className='text-lg mt-4'>
              Rozwijaj swoje umiejętności przetrwania i zdobywaj wiedzę od ekspertów. Nasze kursy survivalowe są
              prowadzone przez doświadczonych instruktorów, którzy przekażą Ci niezbędne techniki i strategie, abyś mógł
              przetrwać w każdych warunkach. Nauczysz się, jak zdobywać jedzenie, wytwarzać narzędzia, budować
              schronienie oraz udzielać pierwszej pomocy. Zajęcia praktyczne w terenie pozwolą Ci przetestować swoją
              wiedzę w realnych sytuacjach, a liczne ćwiczenia sprawią, że zdobędziesz pewność siebie i gotowość do
              działania. Zdobądź umiejętności, które mogą uratować życie i poczuj satysfakcję z bycia samowystarczalnym.
              Dołącz do nas i odkryj, jak wiele możesz się nauczyć o sobie i otaczającym Cię świecie.
            </div>
          </div>
        </div>
        <Card className='mb-8'>
          <CardHeader className='text-xl font-semibold'>Zarezerwuj swoją przygodę juz dziś!</CardHeader>
          <Divider />
          <CardBody className='flex flex-col items-center justify-center gap-2 p-8'>
            <div className='w-64'>
              <div className='font-semibold opacity-60'>telefon</div>
              <div className='text-lg'>+48 601 622 442</div>
            </div>
            <div className='w-64'>
              <div className='font-semibold opacity-60'>email</div>
              <div className='text-lg'>sol.zycia@gmail.com</div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className='w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center'>
        <div className='w-full max-w-[1400px]'>
          Solzycia.pl | &#169; all rights reserved | +48 601 622 442 | sol.zycia@gmail.com
        </div>
      </div>
    </div>
  )
}
