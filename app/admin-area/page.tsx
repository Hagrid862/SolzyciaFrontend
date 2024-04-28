'use client'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Divider, Input, Link } from "@nextui-org/react";
import { login } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation'

export default function AdminAreaPage() {
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error); // Selecting the error directly from the auth state

  async function handleLogin() {
    try {
      await dispatch(login({ username, password })).then(() => {
        router.push('/admin-area/verify');
      })
    } catch (error: any) {
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
          <Input isInvalid={error != null} value={username} onChange={(e) => setUsername(e.target.value)} label='Nazwa użytkownika' />
          <Input errorMessage={error} isInvalid={error != null} value={password} onChange={(e) => setPassword(e.target.value)} label='Hasło' type='password'/>
          <Button onClick={handleLogin} color='primary'>Zaloguj</Button>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area/forgot-password'>Resetuj hasło</Link>
        </CardBody>
      </Card>
    </div>
  );
}
