import RegisterForm from "@/components/features/auth/RegisterForm"
import Wrapper from "@/components/layout/Wrapper"
import translate from "@/i18n/langSwitcher"
import { getLocale } from "next-intl/server"

export default async function SignInPage() {
  const locale = await getLocale()
  const { auth, validations } = translate(locale)

  return (
    <section className="mt-5 mb-25">
      <Wrapper>
        <h2 className="text-center mb-10">{auth.registration}</h2>
        <RegisterForm localeText={{ auth, validations }} />
      </Wrapper>
    </section>
  )
}