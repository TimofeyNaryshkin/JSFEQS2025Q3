'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { LanguagesObjType } from '../../../../messages/en'
import { VALIDATION_RULES } from '@/constants'
import { loginService, registrationService } from '@/services/auth-service'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import useUserStore from '@/store/userStore'
import AuthInput from '@/components/ui/AuthInput'
import data from '@/select-options.json'
import { CityData, PaymentMethod } from '@/types/auth'

const typedData: CityData = data;

interface Props {
  localeText: Pick<LanguagesObjType, 'auth' | 'validations'>
}

interface FormData {
  login: string
  password: string
  confirmPassword: string
  city: keyof CityData
  street: string
  houseNumber: number
  paymentMethod: PaymentMethod
}

export default function RegisterForm({ localeText: { auth, validations } }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signin } = useUserStore((state) => state)
  const router = useRouter()

  const selectedCity = watch('city')
  const password = watch('password')

  const onSumit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setError(false)
    const response = await registrationService(data)
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

  const inputStyle = "medium w-[260px] rounded-xl border border-(--color-border) py-4 px-3"

  return (
    <form onSubmit={handleSubmit(onSumit)} className='flex flex-wrap gap-6' >
      <div className='ml-14'>
        <AuthInput
          label={auth.login}
          placeholder={auth.placeholder}
          message={errors.login?.message}
          register={register('login', {
            required: validations.loginRequired,
            pattern: { value: VALIDATION_RULES.loginPattern, message: validations.login }
          })}
        />
      </div>
      <AuthInput
        label={auth.password}
        placeholder={auth.placeholder}
        type='password'
        message={errors.password?.message}
        register={register('password', {
          required: validations.passwordRequired,
          pattern: { value: VALIDATION_RULES.passwordPattern, message: validations.password }
        })}
      />
      <AuthInput
        label={auth.confirmPassword}
        placeholder={auth.placeholder}
        type='password'
        message={errors.confirmPassword?.message}
        register={register('confirmPassword', {
          required: validations.confirmPasswordRequired,
          validate: (value) => value === password || validations.passwordsMustMatch
        })}
      />
      <div className='flex flex-col'>
        <label className='medium self-start'>{auth.city}</label>
        <select {...register('city', { required: validations.cityRequired })} className={inputStyle}>
          {Object.keys(data).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <p className="text-sm text-red-400">{errors.city?.message}</p>
      </div>
      <div className='flex flex-col'>
        <label className='medium self-start'>{auth.street}</label>
        <select {...register('street', { required: validations.streetRequired })} className={inputStyle}>
          {selectedCity && typedData[selectedCity].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <p className="text-sm text-red-400">{errors.street?.message}</p>
      </div>
      <AuthInput
        label={auth.houseNumber}
        placeholder={auth.placeholder}
        message={errors.houseNumber?.message}
        register={register('houseNumber', {
          required: validations.houseRequired,
          valueAsNumber: true,
          validate: {
            positive: (value) => {
              if (isNaN(value) || value < 1) {
                return validations.house
              }
              return true
            }
          }
        })}
      />
      <div className='flex flex-col'>
        <label className='medium self-start'>{auth.payBy}</label>
        <div className='flex gap-6'>
          <label className='flex gap-1 items-center max-w-fit py-4'>
            <input defaultChecked value='cash' type='radio' {...register('paymentMethod', { required: validations.paymentRequired })} />
            {auth.cash}
          </label>
          <label className='flex gap-1 items-center max-w-fit py-4'>
            <input value='card' type='radio' {...register('paymentMethod', { required: validations.paymentRequired })} />
            {auth.card}
          </label>
        </div>
        <p className="text-sm text-red-400">{errors.paymentMethod?.message}</p>
      </div>
      <div className='w-full flex flex-col items-center justify-center'>
        <input type='submit' value={auth.registration} className='action py-2.5 w-[200px] rounded-[100px] border border-(--color-border-second) cursor-pointer disabled:opacity-50 disabled:pointer-events-none' />
        <p className="text-center mt-5 text-red-400">{error && validations.invalid}</p>
      </div>
    </form >
  )
}