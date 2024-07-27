import Image from 'next/image'
import banner from '@/assets/images/games/banner.jpg'
import adrenaline from '@/assets/images/games/adrenaline.jpg'
import celebration from '@/assets/images/games/celebration.jpg'
import creativity from '@/assets/images/games/creativity.jpg'
import map from '@/assets/images/games/map.jpg'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

export default function BushcraftPage() {
  return (
    <div className='w-full flex flex-col items-center justify-center relative'>
      <div className='h-[calc(100vh-64px)] relative w-full mb-12'>
        <Image src={banner} alt='offroad-jeep' className='w-full h-full opacity-70' layout='fill' objectFit='cover' />
        <div className='relative w-full max-w-[1920px] h-full left-1/2 transform -translate-x-1/2'>
          <div className='absolute top-1/3 left-12'>
            <div className='md:text-6xl lg:text-8xl font-bold '>Gry Zespołowe </div>
            <div className='md:text-xl lg:text-3xl font-semibold'>Siła Współpracy</div>
          </div>
        </div>
      </div>
      <div className='max-w-[1200px] w-full flex flex-col gap-8'>
        <div className='w-full flex flex-row gap-12 my-8 items-center'>
          <Image src={map} alt='mountains-offroad' className='w-1/3 rounded-3xl' />
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Integracja i Współpraca</div>
            <div className='text-lg mt-4'>
              Gry grupowe i terenowe to doskonały sposób na integrację i budowanie współpracy w zespole. Uczestnicy
              wspólnie stawiają czoła wyzwaniom, które wymagają komunikacji, strategii i wzajemnego wsparcia. Każda gra
              jest zaprojektowana tak, aby promować współpracę i zacieśniać więzi między uczestnikami. Przeżyj
              niezapomniane chwile, rozwiązując zagadki, pokonując przeszkody i pracując razem nad osiągnięciem
              wspólnego celu. Dzięki naszym grom grupowym poczujesz, jak ważne jest działanie w zespole i jak wielką
              satysfakcję daje wspólne osiąganie sukcesów.
            </div>
          </div>
        </div>
        <div className='w-full flex flex-row gap-12 my-8 items-center'>
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Adrenalina i Emocje</div>
            <div className='text-lg mt-4'>
              Poczuj dreszcz emocji i adrenalinę podczas dynamicznych gier terenowych. Nasze gry pełne są wyzwań, które
              sprawią, że Twoje serce zacznie bić szybciej. Niezależnie od tego, czy to wyścigi z czasem, ekscytujące
              poszukiwania skarbów, czy rywalizacja drużynowa, każda gra dostarczy Ci mnóstwo wrażeń. Adrenalina, która
              towarzyszy każdej akcji, pozwoli Ci przeżyć intensywne i niezapomniane chwile. Gry terenowe to nie tylko
              świetna zabawa, ale także doskonały sposób na aktywność fizyczną i mentalną. Z nami doświadczysz emocji,
              które na długo pozostaną w Twojej pamięci.
            </div>
          </div>
          <Image src={adrenaline} alt='mountains-offroad' className='w-1/3 rounded-3xl' />
        </div>
        <div className='w-full flex flex-row gap-12 my-8 items-center'>
          <Image src={creativity} alt='mountains-offroad' className='w-1/3 rounded-3xl' />
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Kreatywność i Strategia</div>
            <div className='text-lg mt-4'>
              Kreatywność i Strategia Treść: Gry grupowe i terenowe rozwijają kreatywność i umiejętności strategiczne.
              Uczestnicy muszą wykazać się pomysłowością i logicznym myśleniem, aby znaleźć najlepsze rozwiązania i
              pokonać wyzwania. Nasze gry są zaprojektowane tak, aby stymulować twórcze myślenie i zachęcać do
              innowacyjnych rozwiązań. Planowanie strategii, przewidywanie ruchów przeciwników i efektywne wykorzystanie
              zasobów to klucz do sukcesu. Przeżyj intelektualną przygodę, która rozwija umiejętności analityczne i
              uczy, jak podejmować decyzje w dynamicznie zmieniającym się środowisku. Gry terenowe to doskonały trening
              dla umysłu i ducha.
            </div>
          </div>
        </div>
        <div className='w-full mt-12 flex flex-col gap-12 my-8 items-center'>
          <Image src={celebration} alt='mountains-offroad' className='w-3/4 rounded-3xl' />
          <div className='flex flex-col h-full'>
            <div className='text-4xl font-bold mb-4'>Społeczność i Przyjaźń</div>
            <div className='text-lg mt-4'>
              Społeczność i Przyjaźń Treść: Gry grupowe i terenowe to nie tylko rywalizacja, ale przede wszystkim
              budowanie społeczności i nawiązywanie przyjaźni. Wspólne przeżywanie przygód, dzielenie się
              doświadczeniami i wzajemne wsparcie tworzą trwałe więzi między uczestnikami. Nasze gry są doskonałą okazją
              do poznania nowych ludzi i rozwijania relacji w przyjaznej i inspirującej atmosferze. Z nami znajdziesz
              miejsce, gdzie każdy jest mile widziany, a wspólna zabawa i współpraca tworzą niezapomniane wspomnienia.
              Dołącz do nas i stań się częścią społeczności, która ceni przyjaźń, integrację i wspólne osiąganie celów.
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
