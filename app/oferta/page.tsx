"use client";

import { Card, CardBody, CardHeader, Divider, Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import offroadImage from "../../assets/images/oferta/off-road.jpg";

export default function OfferPage() {
  const router = useRouter();
  
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full md:max-w-[1200px] px-4 py-12">
        <div className="text-4xl font-bold text-center mb-8">Oferta</div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col h-full">
            <CardHeader className="text-2xl font-semibold">
              Szkolenie OffRoad Gdańsk
            </CardHeader>
            <Divider />
            <CardBody className="flex-1 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image 
                  src={offroadImage}
                  alt="Off-road"
                  className="rounded-md object-cover"
                  fill
                />
              </div>
              <div className="text-xl font-semibold mb-2">569 zł</div>
              <p className="mb-4">
                Godzinne szkolenie 1:1 z instruktorem. Land Rover Defender (skrzynia manualna) 
                lub Jeep Wrangler Rubicon (skrzynia automatyczna).
              </p>
              <div className="mt-auto">
                <Button 
                  color="primary" 
                  className="w-full"
                  onPress={() => router.push("/oferta/off-road-gdansk")}
                >
                  Szczegóły
                </Button>
              </div>
            </CardBody>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader className="text-2xl font-semibold">
              Szkolenie OffRoad 8h
            </CardHeader>
            <Divider />
            <CardBody className="flex-1 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image 
                  src={offroadImage}
                  alt="Off-road"
                  className="rounded-md object-cover"
                  fill
                />
              </div>
              <div className="text-xl font-semibold mb-2">969 zł</div>
              <p className="mb-4">
                Całodniowe szkolenie (8h). Minimum 1h za kierownicą terenówki.
                Realizowane od 4 uczestników.
              </p>
              <div className="mt-auto">
                <Button 
                  color="primary" 
                  className="w-full"
                  onPress={() => router.push("/oferta/off-road-8h")}
                >
                  Szczegóły
                </Button>
              </div>
            </CardBody>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader className="text-2xl font-semibold">
              Wyprawa OffRoad 3 dni
            </CardHeader>
            <Divider />
            <CardBody className="flex-1 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image 
                  src={offroadImage}
                  alt="Off-road"
                  className="rounded-md object-cover"
                  fill
                />
              </div>
              <div className="text-xl font-semibold mb-2">1469 zł</div>
              <p className="mb-4">
                Weekendowa wyprawa (3 dni). Minimum 4h za kierownicą terenówki.
                Realizowane od 6 uczestników.
              </p>
              <div className="mt-auto">
                <Button 
                  color="primary" 
                  className="w-full"
                  onPress={() => router.push("/oferta/off-road-3dni")}
                >
                  Szczegóły
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <Card className="mt-12 p-6">
          <CardHeader className="text-2xl font-semibold">
            Dane kontaktowe
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-4">
            <div>
              <div className="font-semibold opacity-70">NIP</div>
              <div>5831389210</div>
            </div>
            <div>
              <div className="font-semibold opacity-70">Stawka VAT</div>
              <div>0 (netto=brutto)</div>
            </div>
            <div>
              <div className="font-semibold opacity-70">Nr konta bankowego</div>
              <div>Bank Pekao S.A. PKOPPLPW 81 1240 1271 1111 0010 8790 4610</div>
            </div>
            <div>
              <div className="font-semibold opacity-70">Email</div>
              <div>sol.zycia@gmail.com</div>
            </div>
            <div>
              <div className="font-semibold opacity-70">Telefon</div>
              <div>+48 601 622 442</div>
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
