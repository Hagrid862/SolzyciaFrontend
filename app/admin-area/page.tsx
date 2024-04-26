'use client'

import {Button, Card, CardBody, CardHeader, Divider, Input, Link, user} from "@nextui-org/react";
import axios from "axios";
import {useState} from "react";
import { redirect } from 'next/navigation'

export default function AdminAreaPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleLogin() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        username: username,
        password: password
      });

      if (response.status == 200) {
        redirect('/admin-area/verify')
      } else {
        setError("An error occurred. Please try again later.");
        return;
      }

    }  catch (error: any) {
      const data = error.response.data;

      if (data.message == "Invalid username or password") {
        setError("Invalid username or password");
        return;
      } else {
        setError("An error occurred. Please try again later.");
        return;
      }
    }
  }

  return (
    <div className='w-[100vw - 2rem] h-screen flex items-center justify-center m-4 md:m-0'>
      <Card className='w-full md:w-[350px]'>
        <CardHeader>
          <h1>Zaloguj się do panelu administratora</h1>
        </CardHeader>
        <Divider/>
        <CardBody className='flex flex-col gap-2'>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} label='Nazwa użytkownika' />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} label='Hasło' type='password'/>
          <Button onClick={async () => await handleLogin} color='primary'>Zaloguj</Button>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area/forgot-password'>Resetuj hasło</Link>
        </CardBody>
      </Card>
    </div>
  )
}