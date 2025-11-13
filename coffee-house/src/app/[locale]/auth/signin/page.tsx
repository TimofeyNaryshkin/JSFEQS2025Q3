import SignInForm from "@/components/features/auth/SignInForm"
import Wrapper from "@/components/layout/Wrapper"
import translate from "@/i18n/langSwitcher"
import { getLocale } from "next-intl/server"

export default async function SignInPage() {
  const locale = await getLocale()
  const { auth, validations } = translate(locale)

  return (
    <section className="mt-5 mb-25">
      <Wrapper>
        <h2 className="text-center mb-10">{auth.signIn}</h2>
        <SignInForm localeText={{ auth, validations }} />
      </Wrapper>
    </section>
  )
}