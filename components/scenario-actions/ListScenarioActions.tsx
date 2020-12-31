import { CheckOutlined } from '@ant-design/icons'
import { Card, List, Tag } from 'antd'
import React, { useState } from 'react'
import { Scenario, ScenarioAction } from '../../src/typings'
import { ScenarioModal } from '../scenarios/ScenarioModal'
import { ScenarioActionItem } from './ScenarioActionItem'

interface Props {
  scenario: Scenario
  scenarioActions: ScenarioAction[]
  onScenarioActionUpdated: (action: ScenarioAction) => any
}

export function ListScenarioActions (props: Props) {
  const { scenario, scenarioActions, onScenarioActionUpdated } = props
  const [editScenarioAction, setEditScenarioAction] = useState<ScenarioAction | null>(null)

  const handleActionUpdateSubmit = (scenarioAction: ScenarioAction) => {
    setEditScenarioAction(null)
    onScenarioActionUpdated(scenarioAction)
  }

  const data = scenarioActions.map(action => {
    let description = <></>
    let avatar = action.integrationAction.integration.logo
    if (avatar.startsWith('/')) {
      avatar = `https://flowoid.com${avatar}`
    }

    switch (action.integrationAction.key) {
      case 'httpRequest':
        description = <><Tag color="blue">{action.inputs.method}</Tag> {action.inputs.url}</>
        break
      case 'assertions':
        description = (
          <List
            size="small"
            dataSource={action.inputs.assertions ?? []}
            renderItem={(item: { leftValue: string, comparator: string, rightValue: string }) => (
              <List.Item>
                <CheckOutlined /> {item.leftValue} {item.comparator} {item.rightValue}
              </List.Item>
            )}
          />
        )
        avatar = '/images/assertions.svg'
        break
    }

    return {
      action,
      title: action.name,
      description,
      avatar
    }
  })

  return (
    <Card title="Test Actions" size="small">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <ScenarioActionItem {...item} onEdit={() => setEditScenarioAction(item.action)}/>
        )}
      />

      <ScenarioModal
        visible={!!editScenarioAction}
        initialScenario={scenario}
        initialScenarioAction={editScenarioAction}
        onUpdateScenarioAction={handleActionUpdateSubmit}
        onCancel={() => setEditScenarioAction(null)}/>
    </Card>
  )
}
