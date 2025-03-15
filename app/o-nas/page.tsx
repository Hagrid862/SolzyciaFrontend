import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

export default function aboutPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] mb-4">
        <div className="w-full flex flex-col items-center justify-center mt-8 gap-2">
          <Image
            src={logo}
            alt="logo"
            className="w-3/4 md:w-1/3 animate-spin-slow duration-[20s]"
          />
          <div className="mt-6 md:w-2/3 mx-2">
            <h1 className="text-4xl font-bold text-center">O nas</h1>
            <p className="text-lg text-center md:text-center">
              Jesteśmy pasjonatami aktywności na świeżym powietrzu,
              specjalizującymi się w organizacji gier zespołowych, survivalu,
              off-roadu i bushcraftu. Nasza misja to dostarczanie
              niezapomnianych przeżyć, które integrują, uczą współpracy i
              wzmacniają więzi. Z nami odkryjesz prawdziwą radość z przygód na
              łonie natury i rozwijania umiejętności przetrwania.
            </p>
          </div>
          <Divider />
          <div className="flex flex-col md:items-end mx-2">
            <h1 className="text-2xl text-center font-bold">Nasze wartości</h1>
            <p className="text-lg md:w-2/3 text-center md:text-right">
              Stawiamy na współpracę, integrację i rozwój osobisty. Cenimy
              autentyczność, szacunek do natury i zrównoważony rozwój. Wierzymy,
              że przygody na świeżym powietrzu wzmacniają więzi i uczą
              odpowiedzialności. Nasze działania kierujemy ku tworzeniu trwałych
              wspomnień i budowaniu społeczności opartej na zaufaniu i wzajemnym
              wsparciu.
            </p>
          </div>
          <Divider className="md:hidden" />
          <div className="flex flex-col mx-2">
            <h1 className="text-2xl text-center md:text-left font-bold">
              Nasza misja
            </h1>
            <p className="text-lg text-center md:text-left md:w-2/3">
              Naszą misją jest inspirowanie ludzi do odkrywania radości i
              korzyści płynących z aktywności na świeżym powietrzu. Poprzez
              organizację gier zespołowych, survivalu, off-roadu i bushcraftu,
              dążymy do wzmacniania więzi, rozwijania umiejętności przetrwania
              oraz promowania szacunku do natury. Chcemy, aby każdy uczestnik
              naszych programów czuł się zintegrowany, zmotywowany i
              przygotowany na wyzwania zarówno w przyrodzie, jak i w codziennym
              życiu.
            </p>
          </div>
          <Divider />
          <div className="w-full">
            <div className="text-center text-4xl font-semibold">Nasze cele</div>
            <div className="flex flex-col md:flex-row mt-4 gap-4 ">
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">
                    Budowanie Silnych Zespołów
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-lg">
                    Naszym celem jest tworzenie silnych, zintegrowanych zespołów
                    poprzez gry i aktywności zespołowe. Wierzymy, że współpraca
                    i wspólne przeżycia wzmacniają relacje, uczą komunikacji
                    oraz budują zaufanie, co przekłada się na lepszą współpracę
                    w codziennym życiu i pracy.
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">
                    Rozwój Umiejętności Przetrwania
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-lg">
                    Dążymy do rozwijania praktycznych umiejętności przetrwania,
                    które pomagają uczestnikom radzić sobie w różnych
                    sytuacjach. Poprzez nasze kursy survivalowe i bushcraftowe,
                    uczymy jak zdobywać jedzenie, budować schronienia i udzielać
                    pierwszej pomocy, co zwiększa pewność siebie i
                    samodzielność.
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">
                    Promowanie Aktywnego Stylu Życia
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-lg">
                    Chcemy inspirować ludzi do prowadzenia aktywnego i zdrowego
                    stylu życia poprzez udział w naszych programach. Aktywności
                    na świeżym powietrzu, takie jak off-road czy gry terenowe,
                    nie tylko poprawiają kondycję fizyczną, ale także wspierają
                    zdrowie psychiczne i emocjonalne, tworząc harmonijną
                    równowagę.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
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
