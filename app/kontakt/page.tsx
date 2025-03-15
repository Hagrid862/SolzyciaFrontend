import { Card, CardBody, Divider, Link } from "@heroui/react";

export default function contactPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[800px] mt-12 flex flex-col gap-4 md:min-h-[calc(100vh-64px-7rem)]">
        <div className="flex flex-row gap-4 items-center">
          <Card radius="lg" className="min-w-[72px] aspect-square">
            <CardBody>
              <span className="material-symbols-rounded" style={{ fontSize: "48px" }}>smartphone</span>
            </CardBody>
          </Card>
          <div>
            <div className="font-medium opacity-70">Telefon</div>
            <div className="text-2xl font-semibold">+48 601 622 442</div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Card radius="lg" className="min-w-[72px] aspect-square">
            <CardBody>
              <span className="material-symbols-rounded" style={{ fontSize: "48px" }}>mail</span>
            </CardBody>
          </Card>
          <div>
            <div className="font-medium opacity-70">E-mail</div>
            <div className="text-2xl font-semibold">sol.zycia@gmail.com</div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Card radius="lg" className="min-w-[72px] aspect-square">
            <CardBody>
              <span className="material-symbols-rounded" style={{ fontSize: "48px" }}>language</span>
            </CardBody>
          </Card>
          <div>
            <div className="font-medium opacity-70">Facebook</div>
            <div>
              <Link
                className="text-2xl font-semibold"
                href="https://www.facebook.com/theSpiceofLifeSolZycia"
              >
                The spice of life
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Card radius="lg" className="min-w-[72px] aspect-square">
            <CardBody>
              <span className="material-symbols-rounded" style={{ fontSize: "48px" }}>location_on</span>
            </CardBody>
          </Card>
          <div>
            <div className="font-medium opacity-70">Adres</div>
            <div className="text-2xl font-semibold">
              ul. Marynarki Polskiej 3, 80-557 Gdańsk
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <div className="w-full text-center text-4xl font-semibold mb-4">
            Mapa
          </div>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322.639512317775!2d18.66591257740878!3d54.398682072613035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0dd90fc52cdd%3A0xe3278f7f908fe94f!2sS%C3%B3l%20%C5%BBycia%20%2F%20The%20Spice%20of%20Life!5e0!3m2!1sen!2spl!4v1722877880672!5m2!1sen!2spl"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="w-full bg-white bg-opacity-25 h-16 flex flex-row items-center justify-center mt-4">
        <div className="w-full max-w-[1400px] mx-4">
          Solzycia.pl | &#169; all rights reserved | +48 601 622 442 |
          sol.zycia@gmail.com
        </div>
      </div>
    </div>
  );
}
