import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import { Scenario, ScenarioAction } from '../../src/typings'
import { HttpRequestForm } from '../forms/HttpRequestForm'

interface CreateScenarioProps {
  onCreateScenario: (scenario: Scenario) => void
}

interface UpdateScenarioActionProps {
  initialScenario: Scenario
  initialScenarioAction: ScenarioAction
  onUpdateScenarioAction: (scenarioAction: ScenarioAction) => void
}

type Props = (CreateScenarioProps | UpdateScenarioActionProps) & {
  visible: boolean
  onCancel: () => void
}

export function ScenarioModal (props: Props) {
  const { visible, onCancel } = props
  const initialInputs = (props as UpdateScenarioActionProps)?.initialScenarioAction?.inputs
  const advancedInitialInputs = { ...initialInputs }
  delete advancedInitialInputs.name
  delete advancedInitialInputs.url
  delete advancedInitialInputs.method

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  let advancedFormData: Record<string, any> = advancedInitialInputs ?? {}
  let submitingForm = false

  const handleAdvancedFormChange = (data: Record<string, any>) => {
    if (!submitingForm) {
      advancedFormData = data
    }
  }

  const handleFormSubmit = async () => {
    // Prevents handleAdvancedFormChange to be called with blank data because of state change
    submitingForm = true

    setLoading(true)
    const formData = {
      ...(await form.validateFields()),
      ...advancedFormData
    }
    console.log('formData =>', formData)
    try {
      if ((props as UpdateScenarioActionProps)?.initialScenario) {
        const updateProps = props as UpdateScenarioActionProps
        await axios.patch(
          `/api/v1/scenarios/${updateProps.initialScenario.id}/actions/${updateProps.initialScenarioAction.id}`,
          {
            ...formData,
            name: updateProps.initialScenarioAction.name
          }
        )
        updateProps.onUpdateScenarioAction({
          ...updateProps.initialScenarioAction,
          inputs: {
            ...updateProps.initialScenarioAction.inputs,
            ...formData
          }
        })
      } else {
        const createProps = props as CreateScenarioProps
        const res = await axios.post('/api/v1/scenarios', formData)
        createProps.onCreateScenario(res.data.scenario)
      }
      form.resetFields()
    } catch (e) {
      // TODO
    } finally {
      setLoading(false)
    }
  }

  const handleFormFail = () => {
    // TODO
  }

  return (
    <Modal
      title={initialInputs ? 'Update Scenario Action' : 'Create Scenario'}
      visible={visible}
      okText={initialInputs ? 'Update' : 'Create'}
      confirmLoading={loading}
      onOk={handleFormSubmit}
      onCancel={onCancel}>

      <HttpRequestForm
        form={form}
        initialInputs={initialInputs}
        onSubmit={handleFormSubmit}
        onSubmitFailed={handleFormFail}
        onAdvanceOptionsChange={handleAdvancedFormChange}
        prependFields={
          initialInputs
            ? undefined
            : [(
              <Form.Item
                key="scenario-name"
                label="Scenario Name"
                name="name"
                rules={[{ required: true, message: 'Please input a name for the scenario.' }]}>
                <Input />
              </Form.Item>
            )]
        }/>

    </Modal>
  )
}
