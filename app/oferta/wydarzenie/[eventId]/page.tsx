
export default function OfferProductPage({params}: {params: {eventId: string}}) {
  return (
    <div>
      <h1>Product: {params.eventId}</h1>
    </div>
  )
}