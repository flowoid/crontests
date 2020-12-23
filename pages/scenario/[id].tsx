import { GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PageWrapper } from '../../components/common/PageLayout/PageWrapper'
import { ListScenarioActions } from '../../components/scenario-actions/ListScenarioActions'
import { ScenarioFrequency } from '../../components/scenarios/ScenarioFrequency'
import { ScenarioService } from '../../src/services/scenario.service'
import { Scenario } from '../../src/typings'
import { getQueryParam } from '../../src/utils/next.utils'
import { getAuthUsername } from '../../src/utils/user.utils'

interface Props {
  username: string
  scenario?: Scenario
  error?: string
}

function ScenarioPage (props: Props) {
  const { error } = props
  const [scenario, setScenario] = useState(props.scenario)
  const router = useRouter()

  if (!scenario || error) {
    return <>Unexpected error</> // TODO
  }

  const handleScenarioUpdate = async () => {
    const updatedScenario = await ScenarioService.getScenarioById(scenario.id)
    setScenario(updatedScenario)
  }

  const handleGoBack = async () => {
    await router.push('/')
  }

  return (
    <>
      <Head>
        <title>{scenario.name}</title>
      </Head>

      <PageWrapper title={scenario.name}
                  //  extra={renderHeaderExtra()}
                   onBack={handleGoBack}>

        <div style={{ marginBottom: 16 }}>
          <ScenarioFrequency scenario={scenario} onFrequencyUpdate={handleScenarioUpdate}/>
        </div>

        <ListScenarioActions scenarioActions={scenario.actions ?? []}/>
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
        username,
        scenario
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
