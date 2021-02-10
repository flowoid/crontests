import { withAuthenticator } from '@aws-amplify/ui-react'
import { Card } from 'antd'
import Head from 'next/head'
import React from 'react'
import { PageWrapper } from '../../components/common/PageLayout/PageWrapper'
import { ProfileSecurityForm } from '../../components/users/settings/ProfileSecurityForm'

function SettingsPage () {
  return (
    <>
      <Head>
        <title>Settings - CronTests</title>
      </Head>

      <PageWrapper title="Settings" onBack={() => window.history.back()}>

        <Card title="Security" style={{ marginTop: 24 }}>
          <ProfileSecurityForm />
        </Card>

      </PageWrapper>
    </>
  )
}

export default withAuthenticator(SettingsPage)
