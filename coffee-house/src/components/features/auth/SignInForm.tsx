'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { LanguagesObjType } from '../../../../messages/en'
import { VALIDATION_RULES } from '@/constants'
import { loginService } from '@/services/auth-service'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import useUserStore from '@/store/userStore'

interface Props {
  localeText: Pick<LanguagesObjType, 'auth' | 'validations'>
}

interface FormData {
  login: string
  password: string
}

export default function SignInForm({ localeText: { auth, validations } }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signin } = useUserStore((state) => state)
  const router = useRouter()

  const inputStyle = "medium w-[400px] rounded-xl border border-(--color-border) py-4 px-3"

  const onSumit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setError(false)
    const response = await loginService(data)
    setIsLoading(false)
    if (!response?.data) {
      setError(true)
      return
    }
    signin(response.data)
    router.push('/menu')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <form onSubmit={handleSubmit(onSumit)} className='flex flex-col max-w-[400px] mx-auto' >
      <label className='medium self-start'>{auth.login}</label>
      <input {...register('login', {
        required: validations.loginRequired,
        pattern: { value: VALIDATION_RULES.loginPattern, message: validations.login }
      })}
        className={inputStyle}
        placeholder={auth.placeholder} />
      <p className="text-sm text-red-400">{errors.login?.message}</p>
      <label className='medium mt-6'>{auth.password}</label>
      <input type='password' {...register('password', {
        required: validations.passwordRequired,
        pattern: { value: VALIDATION_RULES.passwordPattern, message: validations.password }
      })}
        className={inputStyle}
        placeholder={auth.placeholder} />
      <p className="text-sm text-red-400">{errors.password?.message}</p>
      <input type='submit' value={auth.signIn} className='action self-center mt-10 py-2.5 w-[200px] rounded-[100px] border border-(--color-border-second) cursor-pointer disabled:opacity-50 disabled:pointer-events-none' />
      <p className="text-center mt-5 text-red-400">{error && validations.invalid}</p>
    </form >
  )
}