'use client';

import {Button, Card, CardBody, CardHeader, Checkbox, Divider, Input, Link} from "@nextui-org/react";
import { useFormState } from 'react-dom'
import { login } from '@/app/actions/auth'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function AdminAreaPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [state, action] = useFormState(login, undefined)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleLogin = (event: React.FormEvent) => {
    setLoading(true);

    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('remember', remember ? '1' : '0');

    action(formData);
  }

  useEffect(() => {
    setLoading(false);
    if (state?.message === 'SUCCESS') {
      router.push('/admin-area/verify');
    }
  }, [state]);

  return (
    <div className='w-[100vw - 2rem] h-screen flex items-center justify-center m-4 md:m-0'>
      <Card className='w-full md:w-[400px]'>
        <CardHeader>
          <h1>Zaloguj się do panelu administratora</h1>
        </CardHeader>
        <Divider/>
        <CardBody className='flex flex-col gap-2'>
          <Input errorMessage={state?.errors?.username} isInvalid={state?.errors?.username != undefined || state?.message == 'ERROR' || state?.message == 'INVALID_CREDENTIALS' } value={username} onChange={(e) => setUsername(e.target.value)} label='Nazwa użytkownika' />
          <Input errorMessage={state?.errors?.password ? state.errors.password : state?.message == 'ERROR' ? 'Wystąpił nieznany błąd.' : state?.message == 'INVALID_CREDENTIALS' ? 'Podane dane są nieprawidłowe' : '' }  isInvalid={state?.errors?.username != undefined || state?.message == 'ERROR' || state?.message == 'INVALID_CREDENTIALS' } value={password} onChange={(e) => setPassword(e.target.value)} label='Hasło' type='password'/>
          <Checkbox isSelected={remember} onValueChange={(v) => setRemember(v)}>Zapamiętaj mnie</Checkbox>
          <Button onClick={handleLogin} color='primary' isLoading={loading}>Zaloguj</Button>
        </CardBody>
        <Divider/>
        <CardBody>
          <Link href='/admin-area/forgot-password'>Resetuj hasło</Link>
        </CardBody>
      </Card>
    </div>
  );
}
