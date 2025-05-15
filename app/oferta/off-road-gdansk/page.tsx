import Image from "next/image";
import offroadImage from "../../../assets/images/oferta/off-road.jpg";
import { Card, CardBody, CardHeader, Divider, Button } from "@heroui/react";

export default function OffRoadGdanskPage() {
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
            Szkolenie OffRoad Gdańsk
          </div>
          <div className="md:text-xl text-lg lg:text-3xl font-semibold">
            Godzina pełna adrenaliny
          </div>
        </div>
      </div>
      
      <div className="w-full md:max-w-[1200px] px-4 md:px-0 max-w-screen mb-12">
        <Card className="mb-8">
          <CardHeader className="text-2xl font-semibold">
            Szkolenie OffRoad Gdańsk
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-6 p-8">
            <div className="text-3xl font-bold">569 zł</div>
            
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
                Land Rover Defender (skrzynia manualna z reduktorem) lub Jeep Wrangler Rubicon 
                (skrzynia automatyczna z reduktorem) to prawdziwa legenda OffRoad! 
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
                W Gdańsku (okolice Świętego Wojciecha) znajdziemy grząskie błoto, 
                sypki piach, głębokie doły, strome podjazdy i trawersy.
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Przebieg szkolenia</div>
              <p className="text-lg">
                Szkolenie to godzinna jazda z instruktorem w formule 1:1.
                Zaczynamy na parkingu (dzielnica Św. Wojciech). Tu zostawiamy osobówki 
                i pakujemy się do terenówki. Przez godzinę prowadzisz auto ucząc się 
                operowania wszystkimi wajchami i dźwigniami.
              </p>
              <p className="text-lg mt-2">
                Służę pomocą i radą podczas pokonywania każdej przeszkody 😊
              </p>
            </div>
            
            <div>
              <div className="text-xl font-semibold mb-2">Ważne informacje</div>
              <ul className="list-disc pl-6 text-lg space-y-2">
                <li>Atrakcja przeznaczona wyłącznie dla osoby obdarowanej.</li>
                <li>Jazdy odbywają się przeważnie raz w miesiącu od marca do listopada w dni, 
                    gdzie znajdzie się co najmniej 4 chętnych do szkolenia.</li>
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