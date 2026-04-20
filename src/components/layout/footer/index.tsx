import Link from 'next/link'
import FooterSocial from './footer-social'

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mt-8 py-8 flex items-center justify-center gap-y-2 md:space-x-12 flex-col md:flex-row">
        <img src="/images/logo/goinup.webp" height={60} width={60} alt="Logo" />

        <div className="order-last md:order-0 text-center">
          <p className="text-sm">
            <Link href="/about" prefetch={false} className="hover:text-blue-600">Contatti</Link> | <Link href="/legal/terms" prefetch={false} className="hover:hover:text-blue-600">Termini e Condizioni</Link> | <Link href="/legal/privacy-policy" prefetch={false} className="hover:hover:text-blue-600">Informativa sulla Privacy</Link>
          </p>
          <p className="block text-xs text-slate-400">GOinUP © {new Date().getFullYear()}</p>
        </div>

        <FooterSocial />
      </div>
    </footer>
  )
}
