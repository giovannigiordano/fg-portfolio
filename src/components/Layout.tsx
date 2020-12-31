import Head from 'next/head'
import Navigation from './Navigation'
import { useDevice } from '../contexts/device'
import makeDeviceClassName from '../lib/makeDeviceClassName'

type Props = {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  const device = useDevice()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>

      <main
        className={makeDeviceClassName(
          'flex',
          'justify-center',
          'justify-center',
          device.value
        )}
      >
        {children}
      </main>
    </>
  )
}
