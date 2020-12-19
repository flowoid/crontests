import { Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import { Scenario } from '../../src/typings'

interface Props {
  visible: boolean
  onCreate: (scenario: Scenario) => void
  onCancel: () => void
}

export function ScenarioModal (props: Props) {
  const { visible, onCreate, onCancel } = props
  const [creatingScenario, setCreatingScenario] = useState(false)
  const [form] = Form.useForm()

  const handleFormSubmit = async () => {
    setCreatingScenario(true)
    const formData = await form.validateFields()
    const res = await axios.post('/api/v1/scenarios', formData)
    onCreate(res.data.scenario)
    form.resetFields()
    setCreatingScenario(false)
  }

  const handleFormFail = () => {
    // TODO
  }

  return (
    <Modal
      title="Create Scenario"
      visible={visible}
      okText="Create"
      confirmLoading={creatingScenario}
      onOk={handleFormSubmit}
      onCancel={onCancel}>

      <Form
        form={form}
        name="create-scenario"
        layout="vertical"
        initialValues={{ method: 'GET' }}
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormFail}
      >
        <Form.Item
          label="Scenario Name"
          name="name"
          rules={[{ required: true, message: 'Please input a name for the scenario.' }]}
        >
          <Input />
        </Form.Item>

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
      </Form>

    </Modal>
  )
}
