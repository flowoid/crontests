import { Alert, Modal } from 'antd'
import React, { useState } from 'react'
import { ScenarioService } from '../../src/services/scenario.service'
import { Scenario } from '../../src/typings'
import { SchemaForm } from '../common/SchemaForm/SchemaForm'

interface Props {
  scenario: Scenario
  visible: boolean
  onSet: () => void
  onCancel: () => void
}

export const FrequencyModal = (props: Props) => {
  const { scenario, visible, onSet, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      await ScenarioService.patchScenario(scenario.id, { schedule: formData.flowoid_schedule })
      onSet()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const schema = {
    properties: {
      flowoid_schedule: {
        $ref: '#/definitions/flowoid_schedule'
      }
    },
    required: ['flowoid_schedule']
  }

  const initialInputs = {
    flowoid_schedule: scenario.schedule ?? {
      frequency: 'interval',
      interval: 300
    }
  }

  let formData: Record<string, any> = initialInputs

  return (
    <Modal
      title="Run Frequency"
      visible={visible}
      okText="Set"
      confirmLoading={loading}
      onOk={handleFormSubmit}
      onCancel={onCancel}>

        {
          error && <Alert message={error} type="error" showIcon={true}/>
        }

        <SchemaForm
          schema={schema}
          initialInputs={initialInputs}
          hideSubmit={true}
          onChange={data => { formData = data }}/>

    </Modal>
  )
}
