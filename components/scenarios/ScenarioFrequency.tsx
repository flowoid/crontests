import { ClockCircleOutlined } from '@ant-design/icons'
import { Button, Card, List } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Scenario } from '../../src/typings'
import { getDayOfWeek } from '../../src/utils/date.utils'
import { getOrdinal } from '../../src/utils/number.utils'
import { assertNever } from '../../src/utils/typescript.utils'
import { ScenarioActionItem } from '../scenario-actions/ScenarioActionItem'
import { FrequencyModal } from './FrequencyModal'

interface Props {
  scenario: Scenario
  onFrequencyUpdate: () => void
}

export const ScenarioFrequency = (props: Props) => {
  const { scenario, onFrequencyUpdate } = props
  const [frequencyModalOpen, setFrequencyModalOpen] = useState(false)

  const handleSetFrequencyClick = () => {
    setFrequencyModalOpen(true)
  }

  const handleFrequencyUpdate = () => {
    setFrequencyModalOpen(false)
    onFrequencyUpdate()
  }

  const getIntervalDescription = (interval: number): string => {
    if (interval % 60 !== 0) {
      return `Every ${interval} seconds.`
    }
    interval = interval / 60
    if (interval % 60 !== 0) {
      return `Every ${interval} minutes.`
    }
    interval = interval / 60
    if (interval % 24 !== 0) {
      return `Every ${interval} hours.`
    }
    interval = interval / 24
    return `Every ${interval} days.`
  }

  const renderFrequency = (): JSX.Element => {
    let description: string = ''

    switch (scenario.schedule.frequency) {
      case 'once':
        description = `On ${dayjs(scenario.schedule.datetime).format('DD/MM/YYYY [at] HH:mm:ss ([GMT]Z)')}.`
        break
      case 'interval':
        description = getIntervalDescription(scenario.schedule.interval)
        break
      case 'hour':
        description = `Every hour at minute ${scenario.schedule.minute}.`
        break
      case 'day':
        description = `Every day at ${scenario.schedule.time}.`
        break
      case 'week':
        description = `Every ${getDayOfWeek(scenario.schedule.dayOfWeek)} at ${scenario.schedule.time}.`
        break
      case 'month':
        description = `On the ${getOrdinal(scenario.schedule.dayOfMonth)} day of each month at ${scenario.schedule.time}.`
        break
      case 'cron':
        description = `Cron expression: ${scenario.schedule.expression}`
        break
      default:
        assertNever(scenario.schedule)
    }

    return (
      <Card title="Scenario Schedule" size="small">
        <List
          itemLayout="horizontal"
          dataSource={[{
            title: '',
            description,
            avatar: 'https://flowoid.com/logos/schedule.svg'
          }]}
          renderItem={item => (
            <ScenarioActionItem {...item} />
          )}
        />
      </Card>
    )
  }

  const renderSetFrequencyButton = () => {
    return (
      <Button onClick={handleSetFrequencyClick} type="primary" icon={<ClockCircleOutlined />}>Set Run Frequency</Button>
    )
  }

  return (
    <>
      {
        scenario.schedule
          ? renderFrequency()
          : renderSetFrequencyButton()
      }

      <FrequencyModal
        scenario={scenario}
        visible={frequencyModalOpen}
        onCancel={() => setFrequencyModalOpen(false)}
        onSet={handleFrequencyUpdate}/>
    </>
  )
}
