import { Avatar, List } from 'antd'
import React from 'react'

interface Props {
  title: JSX.Element | string
  description: JSX.Element | string
  avatar: string
}

export function ScenarioActionItem (props: Props) {
  return (
    <List.Item actions={[<a key="edit">edit</a>, <a key="delete">delete</a>]}>
      <List.Item.Meta
        title={props.title}
        description={props.description}
        avatar={<Avatar src={props.avatar} shape="square" />}
      />
    </List.Item>
  )
}
