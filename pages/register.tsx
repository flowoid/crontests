import React from 'react'
import { AuthState } from '@aws-amplify/ui-components'
import { UserAuth } from '../components/users/UserAuth'

function RegisterPage (): JSX.Element {
  return <UserAuth initialAuthState={AuthState.SignUp}/>
}

export default RegisterPage
