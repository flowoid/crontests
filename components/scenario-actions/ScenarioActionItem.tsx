import { Avatar, List } from 'antd'
import React from 'react'

interface Props {
  title: JSX.Element | string
  description: JSX.Element | string
  avatar: string
  deletable?: boolean
  onEdit?: () => any
  onDelete?: () => any
}

export function ScenarioActionItem (props: Props) {
  const itemActions = [
    <a onClick={() => props.onEdit?.()} key="edit">edit</a>,
    props.deletable && <a onClick={() => props.onDelete?.()} key="delete">delete</a>
  ].filter(action => !!action)
  return (
    <List.Item actions={itemActions}>
      <List.Item.Meta
        title={props.title}
        description={props.description}
        avatar={<Avatar src={props.avatar} shape="square" />}
      />
    </List.Item>
  )
}
