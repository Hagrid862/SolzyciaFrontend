import Image from "next/image";
import banner from "../../assets/images/off-road/banner.jpg";
import natureOffroad from "../../assets/images/off-road/nature-offroad.png";
import mudOffroad from "../../assets/images/off-road/mud-offroad.png";
import familyOffroad from "../../assets/images/off-road/family-offroad.png";
import communityOffroad from "../../assets/images/off-road/offroad-community.png";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

export default function offroadPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="h-[calc(100vh-64px)] relative w-full mb-12">
        <Image
          src={banner}
          alt="offroad-jeep"
          className="w-full h-full opacity-75"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-1/3 left-12">
          <div className="md:text-6xl text-4xl lg:text-8xl font-bold ">
            Off-Road
          </div>
          <div className="md:text-xl text-lg lg:text-3xl font-semibold">
            Przygoda zaczyna się tutaj.
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-[1200px] px-2 md:px-0 max-w-screen">
        <div className="w-full flex flex-col md:flex-row gap-12 my-8 items-center">
          <Image
            src={natureOffroad}
            alt="mountains-offroad"
            className="order-first md:order-last w-full md:w-1/3 rounded-3xl"
          />
          <div className="flex flex-col h-full">
            <div className="text-4xl font-bold text-center md:text-left mb-4">
              Eksploruj Naturę
            </div>
            <div className="text-lg mt-4 text-center md:text-left">
              Znajdź nowe szlaki i odkryj nieznane zakątki z nami. Offroad to
              nie tylko jazda, ale przede wszystkim podróż przez dzikie i
              malownicze krajobrazy, które są niedostępne dla zwykłych pojazdów.
              Nasze pojazdy offroad pozwolą Ci dotrzeć tam, gdzie cywilizacja
              nie sięga. Przeżyj niezapomniane chwile, podziwiając majestatyczne
              góry, gęste lasy i dzikie rzeki. Z każdą trasą czekają na Ciebie
              nowe wyzwania i niezwykłe widoki, które zapierają dech w
              piersiach. Przygotuj się na przygodę, która pokaże Ci piękno
              natury w najczystszej formie. Z nami poczujesz prawdziwą wolność i
              bliskość natury, której nie doświadczysz nigdzie indziej.
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-12 my-8 items-center">
          <Image
            src={mudOffroad}
            alt="mountains-offroad"
            className="md:w-1/3 rounded-3xl"
          />
          <div className="flex flex-col h-full">
            <div className="text-4xl font-bold mb-4 text-center">
              Adrenalina na Maksymalnych Obrotach
            </div>
            <div className="text-lg mt-4 text-center md:text-left">
              Poczuj dreszcz emocji na każdej trasie. Offroad to nie tylko jazda
              – to pasja i emocje, które podnoszą poziom adrenaliny. Nasze trasy
              pełne są wyzwań, które sprawią, że Twoje serce zacznie bić
              szybciej. Każda przeszkoda, którą pokonasz, każda błotnista droga,
              którą przejedziesz, dostarczy Ci niezapomnianych wrażeń. Doświadcz
              ekstremalnej przygody i sprawdź swoje umiejętności w
              najtrudniejszych warunkach. Z nami przeżyjesz chwile pełne emocji,
              które na długo pozostaną w Twojej pamięci. Offroad to prawdziwy
              test odwagi i umiejętności – przekonaj się, jak wiele jesteś w
              stanie osiągnąć, pokonując kolejne wyzwania.
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-12 my-8 items-center">
          <div className="flex flex-col h-full">
            <div className="text-4xl font-bold text-center md:text-left mb-4">
              Przygoda dla Całej Rodziny
            </div>
            <div className="text-lg mt-4 text-center md:text-left">
              Offroad to nie tylko ekstremalne wyzwania – to także doskonały
              sposób na spędzenie czasu z rodziną. Nasze wyprawy są dostosowane
              do potrzeb każdego członka rodziny, niezależnie od wieku. Dzieci
              będą zachwycone możliwością przeżycia prawdziwej przygody, a
              dorośli docenią chwile spędzone razem, z dala od codziennych
              trosk. Wspólne pokonywanie trudnych tras, oglądanie dzikiej
              przyrody i odkrywanie nieznanych miejsc zbliży Was do siebie i
              stworzy wspomnienia, które pozostaną z Wami na zawsze. Bezpieczne
              i komfortowe pojazdy oraz profesjonalna obsługa zapewnią Wam
              niezapomniane przeżycia w pełni dostosowane do rodzinnych potrzeb.
              Offroad to idealna okazja, by pokazać dzieciom piękno natury i
              nauczyć je, jak ważna jest współpraca i wzajemne wsparcie.
            </div>
          </div>
          <Image
            src={familyOffroad}
            alt="mountains-offroad"
            className="order-first md:order-last md:w-1/3 rounded-3xl"
          />
        </div>
        <div className="w-full flex flex-col gap-12 my-8 mt-16 items-center">
          <Image
            src={communityOffroad}
            alt="mountains-offroad"
            className="md:w-3/4 rounded-3xl"
          />
          <div className="flex flex-col h-full">
            <div className="text-4xl font-bold mb-4 text-center">
              Społeczność Offroad
            </div>
            <div className="text-lg mt-4 text-center">
              Razem tworzymy niezapomniane wspomnienia. Offroad to nie tylko
              jazda – to ludzie, którzy dzielą Twoją pasję. Dołącz do naszej
              społeczności, poznaj nowych przyjaciół i razem twórzmy
              niezapomniane wspomnienia. Wspólne wyprawy to najlepszy sposób na
              zacieśnianie więzi i dzielenie się przygodami. Spotykamy się
              regularnie, aby wspólnie przeżywać emocje i dzielić się
              doświadczeniami z trasy. Nasza społeczność to miejsce, gdzie
              znajdziesz wsparcie i inspirację do kolejnych wyzwań. Razem
              przeżywamy chwile radości i pokonujemy trudności, tworząc
              wyjątkowe więzi, które trwają latami. Dołącz do nas i stań się
              częścią wielkiej rodziny offroad.
            </div>
          </div>
        </div>
        <Card className="mb-8">
          <CardHeader className="text-xl font-semibold">
            Zarezerwuj swoją przygodę juz dziś!
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
