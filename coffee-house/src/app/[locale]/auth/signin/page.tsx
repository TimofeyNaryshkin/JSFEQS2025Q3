import SignInForm from "@/components/features/auth/SignInForm"
import translate from "@/i18n/langSwitcher"
import { getLocale } from "next-intl/server"

export default async function SignInPage() {
  const locale = await getLocale()
  const { auth, validations } = translate(locale)

  return (
    <section className="mt-5 mb-25">
      <div className="wrapper">
        <h2 className="text-center mb-10">{auth.signIn}</h2>
        <SignInForm localeText={{auth, validations}}/>
      </div>
    </section>
  )
}