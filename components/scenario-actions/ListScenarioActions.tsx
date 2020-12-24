import { Card, List, Tag } from 'antd'
import React from 'react'
import { ScenarioAction } from '../../src/typings'
import { ScenarioActionItem } from './ScenarioActionItem'

interface Props {
  scenarioActions: ScenarioAction[]
}

export function ListScenarioActions (props: Props) {
  const { scenarioActions } = props

  const data = scenarioActions.map(action => {
    let description = <></>
    switch (action.integrationAction.key) {
      case 'httpRequest':
        description = <><Tag color="blue">{action.inputs.method}</Tag> {action.inputs.url}</>
        break
    }
    let avatar = action.integrationAction.integration.logo
    if (avatar.startsWith('/')) {
      avatar = `https://flowoid.com${avatar}`
    }
    return {
      title: action.name,
      description,
      avatar
    }
  })

  return (
    <Card title="Test Actions">
      <List
        itemLayout="horizontal"
        dataSource={data}
        bordered
        renderItem={item => (
          <ScenarioActionItem {...item} />
        )}
      />
    </Card>
  )
}
