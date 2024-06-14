'use client';

import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation';

export default function ViewProductPage() {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const type = searchParams.get('type')

  useEffect(() => {
    console.log('id:', id)
    console.log('type:', type)
  }, [id, type])

  return (
    <>
      <div>View product: {id}</div>
    </>
  );
}