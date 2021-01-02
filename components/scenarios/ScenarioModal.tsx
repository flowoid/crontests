import { Collapse, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import { Scenario, ScenarioAction } from '../../src/typings'
import { SchemaForm } from '../common/SchemaForm/SchemaForm'

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

  const [submitingForm, setSubmitingForm] = useState(false)
  const [advancedFormData, setAdvancedFormData] = useState<Record<string, any>>(advancedInitialInputs ?? {})
  const [form] = Form.useForm()

  const handleAdvancedFormChange = (data: Record<string, any>) => {
    if (!submitingForm) {
      setAdvancedFormData(data)
    }
  }

  const handleFormSubmit = async () => {
    setSubmitingForm(true)
    const formData = {
      ...(await form.validateFields()),
      ...advancedFormData
    }
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
      setSubmitingForm(false)
    }
  }

  const handleFormFail = () => {
    // TODO
  }

  const advancedSchemaForm = {
    type: 'object',
    properties: {
      contentType: {
        title: 'Content-Type',
        type: 'string',
        enum: [
          'application/json',
          'application/xml',
          'application/x-www-form-urlencoded',
          'text/html',
          'text/plain'
        ]
      },
      headers: {
        type: 'object',
        additionalProperties: {
          type: 'string'
        }
      },
      queryParams: {
        title: 'Query Params',
        type: 'object',
        additionalProperties: {
          type: 'string'
        }
      },
      body: {
        type: 'object',
        additionalProperties: true
      },
      basicAuth: {
        title: 'Basic Authentication',
        type: 'object',
        properties: {
          username: {
            type: 'string'
          },
          password: {
            type: 'string',
            format: 'password'
          }
        }
      },
      proxy: {
        type: 'object',
        properties: {
          host: {
            type: 'string'
          },
          port: {
            type: 'integer',
            minimum: 1,
            maximum: 65535
          },
          username: {
            type: 'string'
          },
          password: {
            type: 'string',
            format: 'password'
          }
        }
      }
    }
  }

  return (
    <Modal
      title={initialInputs ? 'Update Scenario Action' : 'Create Scenario'}
      visible={visible}
      okText={initialInputs ? 'Update' : 'Create'}
      confirmLoading={submitingForm}
      onOk={handleFormSubmit}
      onCancel={onCancel}>

      <Form
        form={form}
        name="scenario=form"
        layout="vertical"
        initialValues={initialInputs ?? { method: 'GET' }}
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormFail}
      >
        {
          !initialInputs && (
            <Form.Item
              label="Scenario Name"
              name="name"
              rules={[{ required: true, message: 'Please input a name for the scenario.' }]}
            >
              <Input />
            </Form.Item>
          )
        }
        <Form.Item
          label="HTTP Method"
          name="method"
          rules={[{ required: true, message: 'Please input a method.' }]}
        >
          <Select>
            <Select.Option value="get">GET</Select.Option>
            <Select.Option value="post">POST</Select.Option>
            <Select.Option value="put">PUT</Select.Option>
            <Select.Option value="delete">DELETE</Select.Option>
            <Select.Option value="patch">PATCH</Select.Option>
            <Select.Option value="head">HEAD</Select.Option>
            <Select.Option value="connect">CONNECT</Select.Option>
            <Select.Option value="options">OPTIONS</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Url"
          name="url"
          rules={[{ required: true, message: 'Please input an url to be tested.' }]}
        >
          <Input />
        </Form.Item>

        <Collapse defaultActiveKey={[]} ghost>
          <Collapse.Panel header="Advance settings" key="1">
            <SchemaForm
              schema={advancedSchemaForm}
              hideSubmit={true}
              onChange={handleAdvancedFormChange}
              initialInputs={advancedFormData}/>
          </Collapse.Panel>
        </Collapse>
      </Form>

    </Modal>
  )
}
