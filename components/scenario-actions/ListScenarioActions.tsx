import { CheckOutlined } from '@ant-design/icons'
import { List, Tag } from 'antd'
import React, { useState } from 'react'
import { assertionComparators, assertionResponseKeys } from '../../src/data/assertions'
import { Scenario, ScenarioAction } from '../../src/typings'
import { ScenarioModal } from '../scenarios/ScenarioModal'
import { ScenarioActionItem } from './ScenarioActionItem'
import { ScenarioAssertionsModal } from './ScenarioAssertionsModal'

interface Props {
  scenario: Scenario
  scenarioActions: ScenarioAction[]
  type: 'actions' | 'failure-actions'
  onScenarioActionUpdated: (action: ScenarioAction) => any
}

export function ListScenarioActions (props: Props) {
  const { scenario, scenarioActions, type, onScenarioActionUpdated } = props
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
            renderItem={(item: { leftValueKey: string, leftValue: string, comparator: string, rightValue: string }) => (
              <List.Item>
                <CheckOutlined />&nbsp;
                Expect&nbsp;
                <strong>{assertionResponseKeys[item.leftValueKey]}</strong>&nbsp;
                {item.leftValue ? <>[{item.leftValue}]&nbsp;</> : ''}
                {assertionComparators[item.comparator]?.toLowerCase()}&nbsp;
                <strong>{item.rightValue}</strong>
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
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <ScenarioActionItem {...item} onEdit={() => setEditScenarioAction(item.action)}/>
        )}
      />

      {
        editScenarioAction?.integrationAction.key === 'httpRequest' && (
          <ScenarioModal
            visible={true}
            initialScenario={scenario}
            initialScenarioAction={editScenarioAction}
            type={type}
            onUpdateScenarioAction={handleActionUpdateSubmit}
            onCancel={() => setEditScenarioAction(null)}/>
        )
      }
      {
        editScenarioAction?.integrationAction.key === 'assertions' && (
          <ScenarioAssertionsModal
            visible={true}
            scenario={scenario}
            scenarioAction={editScenarioAction}
            onUpdate={handleActionUpdateSubmit}
            onCancel={() => setEditScenarioAction(null)}/>
        )
      }
    </>
  )
}
