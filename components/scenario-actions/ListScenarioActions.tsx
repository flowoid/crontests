import { Avatar, Card, List } from 'antd'
import React from 'react'
import { ScenarioAction } from '../../src/typings'

interface Props {
  scenarioActions: ScenarioAction[]
}

export function ListScenarioActions (props: Props) {
  const { scenarioActions } = props

  const data = scenarioActions.map(action => ({
    title: action.name
  }))

  return (
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={data}
        bordered
        renderItem={item => (
          <List.Item actions={[<a key="edit">edit</a>, <a key="delete">delete</a>]}>
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={item.title}
              description=""
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
