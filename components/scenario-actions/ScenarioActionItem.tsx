import { Avatar, List } from 'antd'
import React from 'react'

interface Props {
  title: JSX.Element | string
  description: JSX.Element | string
  avatar: string
  onEdit?: () => any
}

export function ScenarioActionItem (props: Props) {
  return (
    <List.Item actions={[<a onClick={() => props.onEdit?.()} key="edit">edit</a>]}>
      <List.Item.Meta
        title={props.title}
        description={props.description}
        avatar={<Avatar src={props.avatar} shape="square" />}
      />
    </List.Item>
  )
}
