import React from 'react'
import Head from 'next/head'
import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Link from 'next/link'
import { Button } from 'antd'
import { PageWrapper } from '../components/common/PageLayout/PageWrapper'

Amplify.configure(awsconfig)

function Home (): JSX.Element {
  return (
    <PageWrapper title="Scenarios">
      <Head>
        <title>Scenarios</title>
      </Head>
      <div style={{ marginBottom: 16 }}>
        <Link href="/new"><Button type="primary">Create Scenario</Button></Link>
      </div>
      <AmplifySignOut />
      My App
    </PageWrapper>
  )
}

export default withAuthenticator(Home)
