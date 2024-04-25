import {Button, Card, CardBody, CardHeader, Divider, Input, Link} from "@nextui-org/react";

export default function AdminAreaPage() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className='w-full md:w-[350px]'>
        <CardHeader>
          <h1>Login to admin panel</h1>
        </CardHeader>
        <Divider/>
        <CardBody className='flex flex-col gap-2'>
          <Input label='Username' />
          <Input label='Password' type='password'/>
          <Button color='primary'>Login</Button>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area/forgot-password'>Forgot password?</Link>
        </CardBody>
      </Card>
    </div>
  )
}