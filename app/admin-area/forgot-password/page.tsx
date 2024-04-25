import {Button, Card, CardBody, CardHeader, Divider, Input, Link} from "@nextui-org/react";

export default function ForgotPasswordPage() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className='w-full md:w-[350px]'>
        <CardHeader>
          <h1>Forgot password</h1>
        </CardHeader>
        <Divider/>
        <CardBody className='flex flex-col gap-2'>
          <Input label='Email' />
          <Button color='primary'>Send email</Button>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area'>Back to login</Link>
        </CardBody>
      </Card>
    </div>
  )
}