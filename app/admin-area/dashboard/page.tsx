import {Card, CardBody, CardHeader, Divider, Link} from "@nextui-org/react";

export default function DashboardPage() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className='w-full md:w-[350px]'>
        <CardHeader>
          <h1>Dashboard</h1>
        </CardHeader>
        <Divider/>
        <CardBody className='flex flex-col gap-2'>
          <h1>Welcome to the dashboard</h1>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area'>Back to login</Link>
        </CardBody>
      </Card>
    </div>
  )
}