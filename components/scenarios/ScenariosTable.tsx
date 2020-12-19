import React from 'react'
import { Table } from 'antd'
import Link from 'next/link'
import { Scenario } from '../../src/typings'

interface Props {
  scenarios: Scenario[]
}

export const ScenariosTable = (props: Props) => {
  const { scenarios } = props

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, scenario: Scenario) =>
        <Link href={`/scenario/${scenario.id}`}><a>{name}</a></Link>
    }
  ]

  return (
    <Table dataSource={scenarios} columns={tableColumns}/>
  )
}
