import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Nazwa użytkownika musi składać się conajmniej z 3 znaków' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Hasło musi posiadać conajmniej 8 znaków' })
    .trim(),
})

export type LoginFormState =
  | {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
}
  | undefined

export const VerifyOtpSchema = z.object({
  otp: z
    .string()
    .min(3, { message: 'Kod werfikacyjny musi zawierać 8 znaków' })
    .max(8, { message: 'Kod werfikacyjny musi zawierać 8 znaków' })
    .trim(),
})

export type VerifyOtpState =
  | {
  errors?: {
    otp?: string[]
  }
  message?: string
}
  | undefined