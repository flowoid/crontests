import React from 'react'
import Amplify from 'aws-amplify'
import config from '../aws-exports'

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import '../components/landing/Landing.css'
import PageLayout from '../components/common/PageLayout/PageLayout'

Amplify.configure({
  ...config,
  ssr: true
})

export default function MyApp ({ Component, pageProps }): JSX.Element {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}
