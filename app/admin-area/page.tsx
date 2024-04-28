'use client'

import {Button, Card, CardBody, CardHeader, Divider, Input, Link, user} from "@nextui-org/react";
import axios from "axios";
import {useState} from "react";
import { redirect } from 'next/navigation'
import {login} from "@/store/slices/authSlice";
import {useDispatch} from "react-redux";
import { AppDispatch } from '@/store/store'; // adjust the import path to your actual store file

export default function AdminAreaPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  async function handleLogin() {
    try {
      console.log("login")
      await dispatch(login({username: username, password: password}));
    } catch (error: any) {
      setError(error.message);
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
          <Button onClick={async () => await handleLogin()} color='primary'>Zaloguj</Button>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area/forgot-password'>Resetuj hasło</Link>
        </CardBody>
      </Card>
    </div>
  )
}