import { Alert, Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Scenario } from '../../src/typings'

interface Props {
  scenario: Scenario
  showSubmit: boolean
  onSubmit: (scenario: Partial<Scenario>) => void
  onChange?: (key: keyof Scenario, value: any) => void
  loading?: boolean
  error: string | null
}

export const ScenarioForm = (props: Props) => {
  const { scenario, showSubmit, onSubmit, onChange, loading, error } = props
  const [name, setName] = useState(scenario?.name ?? '')
  const [form] = Form.useForm()

  useEffect(() => {
    setName(scenario?.name ?? '')
  }, [scenario])

  const handleNameChange = (value: string) => {
    setName(value)
    onChange?.('name', value)
  }

  const handleFormSubmit = (scenario: Partial<Scenario>) => {
    onSubmit(scenario)
  }

  return (
    <>
      {
        error && <Alert
          style={{ marginBottom: 16 }}
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      }
      <Form
        form={form}
        name="workflow-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >

        <Form.Item name="name"
                   label="Scenario Name"
                   initialValue={name}
                   rules={[{ required: true }]}
                   style={{ marginBottom: 32 }}>
          <Input allowClear onChange={e => handleNameChange(e.target.value)}/>
        </Form.Item>

        {
          showSubmit && (
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          )
        }

      </Form>
    </>
  )
}
