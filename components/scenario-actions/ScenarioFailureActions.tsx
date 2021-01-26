import { Button, Card } from 'antd'
import React, { useState } from 'react'
import { Scenario } from '../../src/typings'
import { ScenarioFailureModal } from './ScenarioFailureModal'

interface Props {
  scenario: Scenario
}

export function ScenarioFailureActions (props: Props) {
  const { scenario } = props
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Card title="Actions On Failure" size="small">
      <Button type="primary" onClick={() => setModalOpen(true)}>Add Action On Failure</Button>

      <ScenarioFailureModal scenario={scenario}
                            visible={modalOpen}
                            onActionAdded={() => setModalOpen(false)}
                            onCancel={() => setModalOpen(false)} />
    </Card>
  )
}
