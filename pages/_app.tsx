import React from 'react'
import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
import CookieConsent from '../components/common/CookieConsent'

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import '../components/landing/Landing.css'

Amplify.configure({ ...awsconfig, ssr: true })

export default function MyApp ({ Component, pageProps }): JSX.Element {
  return (
    <>
      <CookieConsent/>
      <Component {...pageProps} />
    </>
  )
}
