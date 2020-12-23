import { ClockCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import { Scenario } from '../../src/typings'
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

  return (
    <>
      <Button onClick={handleSetFrequencyClick} type="primary" icon={<ClockCircleOutlined />}>Set Run Frequency</Button>
      <FrequencyModal
        scenario={scenario}
        visible={frequencyModalOpen}
        onCancel={() => setFrequencyModalOpen(false)}
        onSet={handleFrequencyUpdate}/>
    </>
  )
}
