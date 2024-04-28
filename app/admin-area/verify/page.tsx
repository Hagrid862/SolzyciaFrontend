'use client'

import {Button, Card, CardBody, CardHeader, Divider, Input} from "@nextui-org/react";
import { useState, createRef } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {verify} from "@/store/slices/authSlice";

export default function VerifyPage() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

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
      const otpValue = otp.join("");
      const resultAction = await dispatch(verify({ otp: otpValue }))
      if (verify.fulfilled.match(resultAction)) {
        router.push('/admin-area/dashboard');
      }
    } catch (error: any) {
      console.error(error);
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
          <div className={`mt-4 text-xs ${error ? 'text-red-600' : ' text-opacity-50'}`}>{error ? error : 'Wpisz kod wysłany na twojego maila.'}</div>
        </CardBody>
        <Divider/>
        <CardBody>
          <Button onClick={async () => handleVerify()} color='primary'>Zweryfikuj</Button>
        </CardBody>
      </Card>
    </div>
  )
}