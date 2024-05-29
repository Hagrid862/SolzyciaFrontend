export default function productPage({ params }: { params: { productId: string } }) {
  return <div>{params.productId}</div>
}
