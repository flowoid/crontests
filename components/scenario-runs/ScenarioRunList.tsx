import { CheckOutlined, ClockCircleOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useEffect, useState } from 'react'
import { ScenarioService } from '../../src/services/scenario.service'
import { Scenario, ScenarioRun } from '../../src/typings'
import { Loading } from '../common/Loading'

interface Props {
  scenario: Scenario
}

export function ScenarioRunList (props: Props) {
  dayjs.extend(relativeTime)

  const { scenario } = props
  const [scenarioRuns, setScenarioRuns] = useState<ScenarioRun[] | null>(null)

  useEffect(() => {
     void (async () => {
      const scenarioRuns = await ScenarioService.listScenarioRuns(scenario.id)
      setScenarioRuns(scenarioRuns)
    })()
  }, [])

  const getStatusInfo = (run: ScenarioRun): { title: string, icon: JSX.Element } => {
    switch (run.status) {
      case 'running':
        return {
          title: 'Running',
          icon: <LoadingOutlined />
        }
      case 'sleeping':
        return {
          title: 'Sleeping',
          icon: <ClockCircleOutlined />
        }
      case 'completed':
        return {
          title: 'Passed',
          icon: <CheckOutlined style={{ color: 'green' }} />
        }
      case 'failed':
        return {
          title: 'Failed',
          icon: <CloseOutlined style={{ color: 'red' }} />
        }
      default:
        return {
          title: '',
          icon: <></>
        }
    }
  }

  if (scenarioRuns === null) {
    return <Loading />
  }

  return (
    <Card title="Scenario Runs" size="small">
      <List
        dataSource={scenarioRuns}
        renderItem={item => {
          const status = getStatusInfo(item)
          return (
            <List.Item>
              <List.Item.Meta
                avatar={status.icon}
                title={status.title}
                description={dayjs(item.createdAt).fromNow()}
              />
            </List.Item>
          )
        }}
      />
    </Card>
  )
}
