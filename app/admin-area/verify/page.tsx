'use client'

import {Button, Card, CardBody, CardHeader, Divider, Input} from "@nextui-org/react";
import { useState, createRef } from "react";
import axios from "axios";

export default function VerifyPage() {
  const [otp, setOtp] = useState(Array(8).fill("")); // Create an array of 8 state variables
  const inputRefs = Array(8).fill(0).map((_, i) => createRef<HTMLInputElement>());

  const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = [...otp];
    if (e.target.value !== "" && !/^[0-9]$/.test(e.target.value)) {
      return;
    }
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value !== "") {
      if (index < 7) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify`, {

      });
    } catch (error: any) {
    }
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <Card>
        <CardHeader>
          Weryfikacja dwuetapowa
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className='flex flex-row'>
            {otp.map((value, index) => (
              <Input
                className='max-w-8 mx-1'
                key={index}
                type="text"
                value={value}
                onChange={handleInputChange(index)}
                onKeyDown={handleKeyDown(index)}
                maxLength={1}
                style={{width: "30px", marginRight: "5px"}}
                ref={inputRefs[index]}
              />
            ))}
          </div>
          <div className='mt-4 text-xs text-opacity-50'>Wpisz kod wysłany na twojego maila.</div>
        </CardBody>
        <Divider/>
        <CardBody>
          <Button color='primary'>Zweryfikuj</Button>
        </CardBody>
      </Card>
    </div>
  )
}