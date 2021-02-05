import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import React, { useEffect } from 'react'
import { Loading } from '../components/common/Loading'

function LoginPage (): JSX.Element {
  useEffect(() => {
    void (async () => {
      try {
        await Auth.currentAuthenticatedUser()
        window.location.href = '/'
      } catch (e) {
        // TODO show error
        console.log('error =>', e)
      }
    })()
  })

  return <Loading/>
}

export default withAuthenticator(LoginPage)
