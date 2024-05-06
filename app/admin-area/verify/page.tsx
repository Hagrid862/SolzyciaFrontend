'use client'

import {Button, Card, CardBody, CardHeader, Divider, Input} from "@nextui-org/react";
import React, {useState, createRef, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useFormState} from "react-dom";
import {verifyOtp} from "@/app/actions/auth";

export default function VerifyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [state, action] = useFormState(verifyOtp, undefined)

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

  const handleVerify = async (event: React.FormEvent) => {
    setLoading(true);

    event.preventDefault()

    const otpValue = otp.join("");

    const formData = new FormData();

    formData.append('otp', otpValue);

    console.log(formData)

    action(formData);
  }

  useEffect(() => {
    setLoading(false);
    console.log(state)
    if (state?.message === 'SUCCESS') {
      router.push('/admin-area/dashboard');
    }
  }, [state]);

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
                isInvalid={state?.errors?.otp !== undefined || state?.message == 'ERROR' || state?.message == 'INVALID_CODE'}
                style={{width: "30px", marginRight: "5px"}}
                ref={inputRefs[index]}
              />
            ))}
          </div>
          <div className='mt-2 text-[#f31260] text-sm'>{state?.errors?.otp !== undefined ? state.errors.otp : state?.message == 'ERROR' ? 'Wystąpił błąd, spróbuj odświeżyć stronę.' : state?.message == 'INVALID_CODE' ? 'Wprowadzony kod jest niepoprawny.' : state?.message === undefined || state.message === "SUCCESS" ? null : 'Wystąpił błąd, spróbuj odświeżyć stronę.'}</div>
          <div className={`mt-4 text-xs text-opacity-50'}`}>{state?.message !== 'SUCCESS' && state?.message !== undefined ? state.message : 'Wpisz kod wysłany na twojego maila.'}</div>
        </CardBody>
        <Divider/>
        <CardBody>
          <Button isLoading={loading} onClick={handleVerify} color='primary'>Zweryfikuj</Button>
        </CardBody>
      </Card>
    </div>
  )
}