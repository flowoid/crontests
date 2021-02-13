import { GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { useState } from 'react'
import { Button, Card } from 'antd'
import { PageWrapper } from '../../../components/common/PageLayout/PageWrapper'
import { getAuthUsername } from '../../../src/utils/user.utils'
import { getQueryParam } from '../../../src/utils/next.utils'
import { ScenarioService } from '../../../src/services/scenario.service'
import { Scenario } from '../../../src/typings'
import { ScenarioForm } from '../../../components/scenarios/ScenarioForm'
import { DeleteScenarioModal } from '../../../components/scenarios/DeleteScenarioModal'

interface Props {
  scenario?: Scenario
  error?: string
}

function ScenarioSettingsPage (props: Props) {
  const { scenario, error } = props
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(error ?? null)
  const [deleteScenarioModalOpen, setDeleteScenarioModalOpen] = useState(false)
  const router = useRouter()

  const handleScenarioUpdate = async (update: Partial<Scenario>) => {
    setUpdateLoading(true)
    try {
      await ScenarioService.patchScenario(scenario.id, update)
      await router.push(`/scenario/${scenario.id}`)
    } catch (e) {
      setUpdateError(e.message)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleScenarioDelete = async () => {
    await router.push('/')
  }

  const handleGoBack = async () => {
    await router.push(`/scenario/${scenario.id}`)
  }

  return (
    <>
      <Head>
        <title>{scenario.name} settings</title>
      </Head>

      <PageWrapper title={`Update scenario "${scenario.name}" settings`}
                   onBack={handleGoBack}>

        <Card>
          <ScenarioForm scenario={scenario}
                        showSubmit={true}
                        onSubmit={handleScenarioUpdate}
                        loading={updateLoading}
                        error={updateError}/>
        </Card>

        <Card title="Danger settings" style={{ marginTop: 24, border: '1px solid #d40000' }}>
          <Button type="primary" danger onClick={() => setDeleteScenarioModalOpen(true)}>Delete scenario</Button>
        </Card>

         <DeleteScenarioModal visible={deleteScenarioModalOpen}
                              scenario={scenario}
                              onDeleteScenario={handleScenarioDelete}
                              onCancel={() => setDeleteScenarioModalOpen(false)}/>
      </PageWrapper>
    </>
  )
}

export async function getServerSideProps (ctx): Promise<GetServerSidePropsResult<Props>> {
  const username = await getAuthUsername(ctx.req)
  if (!username) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  try {
    const scenarioId = getQueryParam(ctx, 'id').toLowerCase()
    const scenario = await ScenarioService.getScenarioById(scenarioId, ctx.req)
    if (!scenario) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        scenario
      }
    }
  } catch (e) {
    return {
      props: {
        error: e
      }
    }
  }
}

export default ScenarioSettingsPage
