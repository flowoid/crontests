import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Loading } from '../components/common/Loading'

function LoginPage (): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    void (async () => {
      try {
        await Auth.currentAuthenticatedUser()
        await router.push('/')
      } catch (e) {
        // TODO show error
        console.log('error =>', e)
      }
    })()
  })

  return <Loading/>
}

export default withAuthenticator(LoginPage)
