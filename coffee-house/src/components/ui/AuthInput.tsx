import { Eye, EyeOff } from "lucide-react"
import { HTMLInputTypeAttribute, useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface Props {
  label: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  message?: string
  register: UseFormRegisterReturn
}

export default function AuthInput({ label, placeholder, type = 'text', message, register }: Props) {
  const inputStyle = "medium w-[400px] rounded-xl border border-(--color-border) py-4 pl-3 pr-7"
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  const showPasswordButtonStyle = 'absolute right-3 top-[41px] text-gray-500 hover:text-gray-700 cursor-pointer'

  return (
    <div className='flex flex-col relative'>
      <label className='medium self-start'>{label}</label>
      <input {...register}
        type={isPassword && showPassword ? 'text' : type}
        className={inputStyle}
        placeholder={placeholder} />

      {isPassword &&
        <button onClick={() => setShowPassword(!showPassword)} className={showPasswordButtonStyle}>
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      }
      <p className="text-sm min-h-5 max-w-[400px] text-red-400">{message}</p>
    </div>
  )
}