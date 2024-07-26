import Image from 'next/image'
import banner from '@/assets/images/bushcraft/banner.jpg'
import firecamp from '@/assets/images/bushcraft/firecamp.jpg'
import tradition from '@/assets/images/bushcraft/tradition.jpg'
import footSteps from '@/assets/images/bushcraft/footSteps.jpg'
import group from '@/assets/images/bushcraft/group.jpg'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

export default function BushcraftPage() {
  return (
    <div className='w-full flex flex-col items-center justify-center relative'>
      <div className='h-[calc(100vh-64px)] relative w-full mb-12'>
        <Image src={banner} alt='offroad-jeep' className='w-full h-full opacity-70' layout='fill' objectFit='cover' />
        <div className='relative w-full max-w-[1920px] h-full left-1/2 transform -translate-x-1/2'>
          <div className='absolute top-1/3 left-12'>
            <div className='md:text-6xl lg:text-8xl font-bold '>BushCraft</div>
            <div className='md:text-xl lg:text-3xl font-semibold'>Wróć do korzeni.</div>
          </div>
        </div>
      </div>
      <div className='max-w-[1200px] w-full flex flex-col gap-8'>
        <div className='w-full flex flex-row gap-12 my-8 items-center'>
          <Image src={firecamp} alt='mountains-offroad' className='w-1/3 rounded-3xl' />
          <div className='flex flex-col h-full'>
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
        <div className='w-full flex flex-row gap-12 my-8 items-center'>
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Tradycyjne Techniki i Rzemiosło</div>
            <div className='text-lg mt-4'>
              Odkryj radość tworzenia własnych narzędzi i przedmiotów przy użyciu tradycyjnych technik. Bushcraft to
              sztuka, która czerpie z dawnych umiejętności naszych przodków. Naucz się, jak wyrabiać własne narzędzia,
              pleść kosze, czy wykonywać inne przedmioty codziennego użytku z naturalnych materiałów. Każdy projekt to
              nie tylko praktyczna umiejętność, ale także satysfakcja z tworzenia czegoś własnymi rękami. Nasze
              warsztaty i zajęcia pozwolą Ci zgłębić tajniki tradycyjnego rzemiosła i odkryć, jak wiele radości może
              dawać praca z naturalnymi materiałami. Dołącz do nas i poczuj, jak wielką satysfakcję daje powrót do
              korzeni i tworzenie rzeczy trwałych i pięknych.
            </div>
          </div>
          <Image src={tradition} alt='mountains-offroad' className='w-1/3 rounded-3xl' />
        </div>
        <div className='w-full flex flex-row gap-12 my-8 items-center'>
          <Image src={footSteps} alt='mountains-offroad' className='w-1/3 rounded-3xl' />
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Sztuka Tropienia i Śledzenia</div>
            <div className='text-lg mt-4'>
              Naucz się, jak czytać ślady zwierząt i odkryj tajemnice dzikiej przyrody. Bushcraft to także umiejętność
              obserwacji i zrozumienia otaczającego nas świata. Dzięki naszym kursom dowiesz się, jak rozpoznawać tropy,
              ślady i inne znaki obecności zwierząt. Nauczysz się, jak poruszać się po lesie, by nie spłoszyć jego
              mieszkańców, oraz jak interpretować ich zachowanie. Tropienie to nie tylko praktyczna umiejętność, ale
              także sposób na głębsze połączenie z naturą i zrozumienie jej cykli. Przeżyj wyjątkowe chwile, odkrywając
              ślady życia dzikich zwierząt i ucząc się, jak być częścią ekosystemu. Z nami poznasz sekrety lasu i
              staniesz się prawdziwym mistrzem tropienia.
            </div>
          </div>
        </div>
        <div className='w-full mt-12 flex flex-col gap-12 my-8 items-center'>
          <Image src={group} alt='mountains-offroad' className='w-3/4 rounded-3xl' />
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Społeczność Bushcraftu</div>
            <div className='text-lg mt-4'>
              Dołącz do społeczności pasjonatów bushcraftu i dziel się swoją pasją z innymi. Bushcraft to nie tylko
              indywidualne umiejętności, ale także wspólnota ludzi, którzy dzielą tę samą miłość do przyrody i
              tradycyjnych technik przetrwania. Spotkania, wspólne wyprawy i warsztaty to doskonała okazja do wymiany
              doświadczeń, nauki nowych umiejętności i nawiązywania trwałych przyjaźni. W naszej społeczności znajdziesz
              wsparcie, inspirację i motywację do dalszego rozwoju. Razem tworzymy przestrzeń, gdzie każdy może się
              uczyć i rozwijać, czerpiąc radość z kontaktu z naturą. Dołącz do nas i odkryj, jak wiele radości może
              dawać dzielenie się pasją do bushcraftu z innymi.
            </div>
          </div>
        </div>
        <Card className='mb-8'>
          <CardHeader className='text-xl font-semibold'>Zarezerwuj swoją przygodę juz dziś!</CardHeader>
          <Divider />
          <CardBody className='flex flex-col items-center justify-center gap-2 p-8'>
            <div className='w-64'>
              <div className='font-semibold opacity-60'>telefon</div>
              <div className='text-lg'>+48 123 123 123</div>
            </div>
            <div className='w-64'>
              <div className='font-semibold opacity-60'>email</div>
              <div className='text-lg'>rezerwacja@solzycia.pl</div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className='w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center'>
        <div className='w-full max-w-[1400px]'>
          Solzycia.pl | &#169; all rights reserved | +48 123 123 123 | kontakt@solzycia.pl
        </div>
      </div>
    </div>
  )
}
