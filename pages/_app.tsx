import React from 'react'
import Amplify from '@aws-amplify/core'
import { Auth } from 'aws-amplify'
import awsconfig from '../src/aws-exports'

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import '../components/landing/Landing.css'

// Amplify configuration
const authConfig = { ...awsconfig, ssr: true }
Amplify.configure(authConfig)
Auth.configure(authConfig)

export default function MyApp ({ Component, pageProps }): JSX.Element {
  return <Component {...pageProps} />
}
