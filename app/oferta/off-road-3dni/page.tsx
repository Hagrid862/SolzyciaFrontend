import Image from "next/image";
import offroadImage from "../../../assets/images/oferta/off-road.jpg";
import { Card, CardBody, CardHeader, Divider, Button } from "@heroui/react";

export default function OffRoad3DniPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="h-[calc(100vh-64px)] relative w-full mb-12">
        <Image
          src={offroadImage}
          alt="offroad-jeep"
          className="w-full h-full opacity-75"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-1/3 left-12">
          <div className="md:text-6xl text-4xl lg:text-8xl font-bold">
            Wyprawa OffRoad 3 dni
          </div>
          <div className="md:text-xl text-lg lg:text-3xl font-semibold">
            Weekend za kierownicą terenówki
          </div>
        </div>
      </div>
      
      <div className="w-full md:max-w-[1200px] px-4 md:px-0 max-w-screen mb-12">
        <Card className="mb-8">
          <CardHeader className="text-2xl font-semibold">
            Wyprawa OffRoad 3 dni
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-6 p-8">
            <div className="text-3xl font-bold">1469 zł</div>
            <div className="text-lg font-medium text-blue-600">
              Realizowane od 6 uczestników
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Opis</div>
              <p className="text-lg">
                Doskonały prezent na imieniny, urodziny, wieczór kawalerski, panieński czy inną okazję!
                Próba sił przed kupnem własnego 4×4.
                Duża dawka adrenaliny, przygody oraz wyzwania!
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Nasze samochody</div>
              <p className="text-lg">
                Land Rover Defender (skrzynia manualna z reduktorem) to prawdziwa legenda OffRoad!  
                To wiele lat tradycji i doświadczeń, niezliczone ilości przejechanych 
                kilometrów po świecie w każdych warunkach.
              </p>
              <p className="text-lg mt-2">
                Większość mężczyzn wie od razu co to za auto. Kobiety od razu czują respekt 
                przez bijącą z jego sylwetki siłę.
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Teren</div>
              <p className="text-lg">
                Na trasie znajdziemy grząskie błoto, sypki piach, głębokie doły, 
                strome podjazdy i trawersy.
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Przebieg wyprawy</div>
              <p className="text-lg">
                Zaczynamy w Pomlewie pod Gdańskiem. Rozpoczynamy w piątek po 16:00 i po przejechaniu 
                kilkunastu km rozstawiamy obóz. Sami przygotowujemy kolację na ognisku/kuchence. 
                W sobotę po śniadaniu (znowu uczestnicy gotują na ognisku lub kuchence) pakujemy 
                się i przez cały dzień jedziemy wyznaczoną trasą. Po drodze stajemy na obiad który 
                sami przygotowujemy. Po południu ponownie rozkładamy obozowisko i szykujemy na 
                ognisku kolację. W niedzielę po śniadaniu zaczynamy wracać do punktu startu 
                (koniec wyprawy do godziny 16:00).
              </p>
              <p className="text-lg mt-2">
                Podczas wyprawy przez co najmniej 4h prowadzisz to auto (najczęściej ok 5-6 h) 
                ucząc się operowania wszystkimi wajchami i dźwigniami.
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Wyposażenie</div>
              <p className="text-lg">
                <strong>Auta z wyposażeniem wyprawowym:</strong> każdy Defender posiada namiot dachowy 
                w którym śpią uczestnicy. Dodatkowo do spania na ziemi przewidziany jest przedsionek 
                oraz dopinany pod roletą "pokój". Uczestnicy powinni zabrać własne śpiwory oraz 
                karimaty/materace dostosowane do panującej w nocy temperatury. W wyjątkowych przypadkach 
                instruktor może udostępnić sprzęt do spania (za dodatkową opłatą na pralnię chemiczną) 
                – wymagane powiadomienie co najmniej 7 dni przed wyprawą.
              </p>
              <p className="text-lg mt-2">
                <strong>Gotowanie:</strong> uczestnicy kupują produkty wg listy, gotowanie odbywa się 
                na zmianę zespołami 2-3 osobowymi z produktów uczestników. Dostępne będą naczynia oraz 
                przybory kuchenne. Instruktor podaje propozycje przygotowania potraw wg przepisów 
                z zakupionych przez uczestników produktów.
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Organizacja jazdy</div>
              <p className="text-lg">
                Jazdy najczęściej odbywają się po szkoleniu 8h – jest to "wynajęcie" auta wyprawowego 
                (na 9 osób - zielony Defender) lub ekspedycyjnego (4 osobowy biały) lub obydwu. 
                Uczestnicy są odpowiedzialni za auta oraz za dodatkowy sprzęt. Wyjątkowo można 
                zorganizować wyprawę dla osób nie przeszkolonych – w takim wypadku instruktor jedzie 
                z uczestnikami w Defenderze 9-cio osobowym i każdy najpierw przechodzi szkolenie aby 
                w końcowej fazie wyprawy samodzielnie prowadzić auto.
              </p>
              <p className="text-lg mt-2">
                Możliwe jest również prowadzenie Wranglera jeśli będzie brał udział w wyprawie.
                Instruktor porusza się Wranglerem lub Defenderem i prowadzi wyprawę. W samochodzie 
                instruktora jest od 1 do 3 miejsc – uczestnicy mogą jechać w aucie z instruktorem 
                lub przy większej ilości uczestników – w innym samochodzie z łącznością CB.
              </p>
              <p className="text-lg mt-2">
                Optymalne wyprawy to 3-4 samochody terenowe które sobie pomagają przy bardziej 
                wymagających przeszkodach.
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Ważne informacje</div>
              <ul className="list-disc pl-6 text-lg space-y-2">
                <li>Atrakcja przeznaczona wyłącznie dla osoby obdarowanej.</li>
                <li>Osoba obdarowana musi posiadać ważne prawo jazdy kat. B.</li>
                <li>Zabroniona jest jazda po spożyciu alkoholu i innych środkach odurzających.</li>
              </ul>
            </div>
          </CardBody>
        </Card>
        
        <Card className="mb-8">
          <CardHeader className="text-xl font-semibold">
            Zarezerwuj swoją przygodę już dziś!
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center gap-2 p-8">
            <div className="w-64">
              <div className="font-semibold opacity-60">telefon</div>
              <div className="text-lg">+48 601 622 442</div>
            </div>
            <div className="w-64">
              <div className="font-semibold opacity-60">email</div>
              <div className="text-lg">sol.zycia@gmail.com</div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center">
        <div className="w-full max-w-[1400px]">
          Solzycia.pl | &#169; all rights reserved | +48 601 622 442 |
          sol.zycia@gmail.com
        </div>
      </div>
    </div>
  );
} 