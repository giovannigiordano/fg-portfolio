import 'tailwindcss/tailwind.css'

import { AppProps } from 'next/app'
import { DeviceProvider } from '../contexts/device'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DeviceProvider>
      <Component {...pageProps} />
    </DeviceProvider>
  )
}
