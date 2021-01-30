import { Button, Card } from 'antd'
import React, { useState } from 'react'
import { Scenario, ScenarioAction } from '../../src/typings'
import { ListScenarioActions } from './ListScenarioActions'
import { ScenarioFailureModal } from './ScenarioFailureModal'

interface Props {
  scenario: Scenario
  failureActions: ScenarioAction[]
}

export function ScenarioFailureActions (props: Props) {
  const { scenario, failureActions } = props
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Card title="Actions On Failure" size="small">

      <ListScenarioActions
        scenario={scenario}
        scenarioActions={failureActions}
        onScenarioActionUpdated={() => {}}/>

      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>Add Action On Failure</Button>
      </div>

      <ScenarioFailureModal scenario={scenario}
                            visible={modalOpen}
                            onActionAdded={() => setModalOpen(false)}
                            onCancel={() => setModalOpen(false)} />
    </Card>
  )
}
