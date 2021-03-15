import React, { useEffect, useState } from 'react'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { Loading } from '../common/Loading'
import Link from 'next/link'

interface Props {
  initialAuthState: AuthState.SignIn | AuthState.SignUp
}

export function UserAuth (props: Props): JSX.Element {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    onAuthUIStateChange((authState, user) => {
      if (user && authState === AuthState.SignedIn) {
        window.location.href = '/'
        setLoading(true)
      }
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <AmplifyAuthenticator initialAuthState={props.initialAuthState}>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          {
            type: 'username',
            required: true
          },
          {
            type: 'email',
            required: true
          },
          {
            type: 'password',
            label: 'Password *',
            placeholder: 'Enter your password',
            required: true
          }
        ]}
      >
        <div slot="secondary-footer-content">
          <div style={{ marginBottom: 32 }}>Have an account? <a href='/login'>Sign in</a></div>

          <div style={{ width: '200%' }}>
            By creating an account, you confirm that you have read and agree to our&nbsp;
            <Link href='/legal/terms'>terms and conditions</Link> and&nbsp;
            <Link href='/legal/privacy'>privacy policy</Link>.
          </div>
        </div>
      </AmplifySignUp>
    </AmplifyAuthenticator>
  )
}
