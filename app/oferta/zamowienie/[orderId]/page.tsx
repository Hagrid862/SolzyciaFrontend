
export default function Page({ params }: { params: { orderId: string } }) {
  return (
    <div>
      <h1>Order: {params.orderId}</h1>
    </div>
  );
}