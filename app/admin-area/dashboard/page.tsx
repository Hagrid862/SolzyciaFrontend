'use client'

import { logout } from '@/app/actions/auth';
import { useAdminStore } from '@/store/adminStore';
import { Button } from '@nextui-org/react';

export default function Home() {
  const adminStore = useAdminStore()
  return <div>
    <h1>Dashboard</h1>
    <p>Welcome to the admin dashboard</p>
    <Button onClick={() => adminStore.logout()}>Log out</Button>
  </div>
}
