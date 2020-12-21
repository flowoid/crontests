import { Avatar, Card, List, Tag } from 'antd'
import React from 'react'
import { ScenarioAction } from '../../src/typings'

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
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={data}
        bordered
        renderItem={item => (
          <List.Item actions={[<a key="edit">edit</a>, <a key="delete">delete</a>]}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} shape="square" />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
