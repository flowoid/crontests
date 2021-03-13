import React from 'react'
import { AuthState } from '@aws-amplify/ui-components'
import { UserAuth } from '../components/users/UserAuth'

function LoginPage (): JSX.Element {
  return <UserAuth initialAuthState={AuthState.SignIn}/>
}

export default LoginPage
