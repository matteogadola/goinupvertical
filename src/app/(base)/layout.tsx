import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function BaseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    promoter: string
  }
}) {
  return (
    <>
      <Navbar promoter="goinup" />
      <main>{children}</main>
      <Footer promoter="goinup" />
    </>
  )
}