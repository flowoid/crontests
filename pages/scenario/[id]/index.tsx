import { SettingOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Switch } from 'antd'
import { GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Loading } from '../../../components/common/Loading'
import { PageWrapper } from '../../../components/common/PageLayout/PageWrapper'
import { RequestError } from '../../../components/common/RequestError'
import { ListScenarioActions } from '../../../components/scenario-actions/ListScenarioActions'
import { ScenarioFailureActions } from '../../../components/scenario-actions/ScenarioFailureActions'
import { ScenarioRunList } from '../../../components/scenario-runs/ScenarioRunList'
import { ScenarioFrequency } from '../../../components/scenarios/ScenarioFrequency'
import { ScenarioService } from '../../../src/services/scenario.service'
import { Scenario, ScenarioAction } from '../../../src/typings'
import { getQueryParam } from '../../../src/utils/next.utils'
import { getAuthUsername } from '../../../src/utils/user.utils'

interface Props {
  username: string
  scenario?: Scenario
  failureActions?: ScenarioAction[]
  error?: string
}

function ScenarioPage (props: Props) {
  const { error } = props
  const [scenario, setScenario] = useState(props.scenario)
  const [failureActions, setFailureActions] = useState(props.failureActions)
  const [loadingScenario, setLoadingScenario] = useState(false)
  const [loadingFailureActions, setLoadingFailureActions] = useState(false)
  const [changingScenarioEnable, setChangingScenarioEnable] = useState(false)
  const router = useRouter()

  if (!scenario || error) {
    return <RequestError error={error}/>
  }

  const handleScenarioUpdate = async () => {
    setLoadingScenario(true)
    const updatedScenario = await ScenarioService.getScenarioById(scenario.id)
    setScenario(updatedScenario)
    setLoadingScenario(false)
  }

  const handleFailureActionsChange = async () => {
    setLoadingFailureActions(true)
    const actions = await ScenarioService.listFailureActions(scenario.id)
    setFailureActions(actions)
    setLoadingFailureActions(false)
  }

  const handleEnableClick = async (enabled: boolean) => {
    if (scenario.schedule) {
      setChangingScenarioEnable(true)
      await ScenarioService.patchScenario(scenario.id, { enabled })
      setScenario({
        ...scenario,
        enabled
      })
      setChangingScenarioEnable(false)
    }
  }

  const handleSettingsClick = async () => {
    await router.push(`/scenario/${scenario.id}/settings`)
  }

  const renderHeaderExtra = () => {
    return [
      (
        scenario.schedule &&
        <Switch checkedChildren="On"
                unCheckedChildren="Off"
                loading={changingScenarioEnable}
                checked={scenario.enabled}
                onClick={handleEnableClick} />
      ),
      <Button key="settings"
              onClick={handleSettingsClick}
              icon={<SettingOutlined />}>Settings</Button>
    ]
  }

  const handleGoBack = async () => {
    await router.push('/')
  }

  if (loadingScenario) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>{scenario.name}</title>
      </Head>

      <PageWrapper title={scenario.name}
                   extra={renderHeaderExtra()}
                   onBack={handleGoBack}>

        <Row gutter={16}>
          <Col span={18}>
            <div style={{ marginBottom: 16 }}>
              <ScenarioFrequency scenario={scenario} onFrequencyUpdate={handleScenarioUpdate}/>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Card title="Test Actions" size="small">
                <ListScenarioActions
                  scenario={scenario}
                  scenarioActions={scenario.actions ?? []}
                  type="actions"
                  onScenarioActionUpdated={handleScenarioUpdate}/>
              </Card>
            </div>

            <div style={{ marginBottom: 16 }}>
              {
                loadingFailureActions
                  ? <Loading />
                  : <ScenarioFailureActions
                      scenario={scenario}
                      failureActions={failureActions ?? []}
                      onFailureActionsChange={handleFailureActionsChange} />
              }
            </div>
          </Col>
          <Col span={6}>
            <ScenarioRunList scenario={scenario}/>
          </Col>
        </Row>
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
    const failureActions = await ScenarioService.listFailureActions(scenarioId, ctx.req)
    if (!scenario) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        username,
        scenario,
        failureActions
      }
    }
  } catch (e) {
    return {
      props: {
        username,
        error: e
      }
    }
  }
}

export default ScenarioPage
