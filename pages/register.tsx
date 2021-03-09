import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import React from 'react'

function RegisterPage (): JSX.Element {
  return <AmplifyAuthenticator initialAuthState={'signup' as any}/>
}

export default RegisterPage
