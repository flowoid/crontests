import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from 'antd'
import { PageWrapper } from '../components/common/PageLayout/PageWrapper'
import { ScenarioModal } from '../components/scenarios/ScenarioModal'
import { getAuthUsername } from '../src/utils/user.utils'
import { ScenarioService } from '../src/services/scenario.service'
import { Scenario } from '../src/typings'
import { ScenariosTable } from '../components/scenarios/ScenariosTable'
import { useRouter } from 'next/router'
interface Props {
  username?: string
  scenarios: Scenario[]
  error?: string
}

function HomePage (props: Props) {
  const { username, scenarios } = props
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false)
  const router = useRouter()

  // TODO show landing page
  if (!username) {
    return <h1>Hello, Guest!</h1>
  }

  const handleCreateScenarioClick = () => {
    setScenarioModalVisible(true)
  }

  const handleScenarioCreated = async (scenario: Scenario) => {
    await router.push(`/scenario/${scenario.id}`)
  }

  return (
    <PageWrapper title="Scenarios">
      <Head>
        <title>Scenarios</title>
      </Head>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleCreateScenarioClick}>Create Scenario</Button>
      </div>

      <ScenariosTable scenarios={scenarios}/>

      <ScenarioModal
        visible={scenarioModalVisible}
        onCreate={handleScenarioCreated}
        onCancel={() => setScenarioModalVisible(false)}
      />
    </PageWrapper>
  )
}

export async function getServerSideProps ({ req }): Promise<{ props: Props }> {
  const username = await getAuthUsername(req)
  if (username) {
    try {
      const scenarios = await ScenarioService.listScenarios(req)
      return {
        props: {
          username,
          scenarios
        }
      }
    } catch (e) {
      return {
        props: {
          scenarios: [],
          error: e
        }
      }
    }
  }
  return {
    props: {
      scenarios: []
    }
  }
}

export default HomePage
