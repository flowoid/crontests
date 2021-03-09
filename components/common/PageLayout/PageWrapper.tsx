import { PageHeader } from 'antd'
import { PageHeaderProps } from 'antd/lib/page-header'
import React from 'react'
import PageLayout from './PageLayout'

export const PageWrapper = (props: PageHeaderProps & { children: React.ReactNode }) => {
  const { children } = props
  const pageHeaderProps = {
    ghost: false,
    ...props,
    children: undefined
  }

  return (
    <PageLayout>
      <>
        <PageHeader {...pageHeaderProps}/>
        <div style={{ margin: '24px 24px 0' }}>
          {children}
        </div>
      </>
    </PageLayout>
  )
}
