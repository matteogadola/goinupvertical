import { getPage } from '@/utils/sanity/queries'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Regolamento",
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h5: ({children}) => <h5 className="pt-2 pb-1 font-semibold text-primary">{children}</h5>,
  },
  list: {
    bullet: ({children}) => <ul className="my-2">{children}</ul>,
  },
  listItem: {
    bullet: ({children}) => <li style={{
      listStyleType: 'disc',
      listStylePosition: 'inside'
    }}>{children}</li>,
  },
}

export default async function RegulationPage() {
  const page = await getPage('regulation');

  return (
    <div className="">
      <h1 className="title">{page.name}</h1>

      <section className="mt-8">
        <PortableText value={page.body} components={components} />
      </section>
    </div>
  )
}
