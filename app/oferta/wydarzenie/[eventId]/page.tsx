'use client';

import {useEffect, useState} from "react";
import {useOfferStore} from "@/store/offerStore";

export default function OfferProductPage({params}: {params: {eventId: string}}) {
  const [event, setEvent] = useState<any>(null);

  const store = useOfferStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await store.fetchEventById(params.eventId);
      if (response.isSuccess) {
        setEvent(response.event);
      }
    }

    fetchProduct();
  }, [])

  return (
    <div>
      {'event: ' + event.id}
    </div>
  )
}