'use client';

import { useState } from "react";

export default function Page({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)

  

  return (
    <div>
      <h1>Order: {params.orderId}</h1>
    </div>
  );
}