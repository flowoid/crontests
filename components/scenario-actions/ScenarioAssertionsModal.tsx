import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import { Scenario, ScenarioAction } from '../../src/typings'

interface Props {
  visible: boolean
  scenario: Scenario
  scenarioAction: ScenarioAction
  onUpdate: (scenarioAction: ScenarioAction) => void
  onCancel: () => void
}

export function ScenarioAssertionsModal (props: Props) {
  const { visible, scenario, scenarioAction, onUpdate, onCancel } = props
  const assertions = (scenarioAction.inputs?.assertions ?? []).map(assertion => {
    const match = assertion.leftValue.match(/\{\{\w+\.([^}]+)\}\}/)
    let leftValueKey: string
    let leftValue: string
    if (match?.length > 1) {
      if (match[1] === 'status') {
        leftValueKey = 'statusCode'
      } else if (match[1] === 'time') {
        leftValueKey = 'time'
      } else if (match[1].startsWith('data.')) {
        leftValueKey = 'body'
        leftValue = match[1].split('.').slice(1).join('.')
      } else if (match[1].startsWith('headers.')) {
        leftValueKey = 'headers'
        leftValue = match[1].split('.').slice(1).join('.')
      }
    }
    return {
      leftValueKey,
      leftValue,
      comparator: assertion.comparator,
      rightValue: assertion.rightValue
    }
  })

  const [submitingForm, setSubmitingForm] = useState(false)
  const [formData, setFormData] = useState({ assertions })
  const [form] = Form.useForm()

  const handleFormSubmit = async () => {
    setSubmitingForm(true)
    try {
      const inputs = await form.validateFields()
      await axios.patch(`/api/v1/scenarios/${scenario.id}/actions/${scenarioAction.id}`, {
        assertions: inputs.assertions,
        name: scenarioAction.name
      })
      onUpdate({
        ...scenarioAction,
        inputs
      })
      form.resetFields()
    } catch (e) {}
    setSubmitingForm(false)
  }

  const handleFormFail = () => {
    // TODO
  }

  const renderSelectorInput = (props: { valueKey: string, fieldName: number, fieldKey: number }) => {
    const { valueKey, fieldName, fieldKey } = props
    if (!['body', 'headers'].includes(valueKey)) {
      return <></>
    }
    return (
      <>
        <Form.Item
          name={[fieldName, 'leftValue']}
          fieldKey={[fieldKey, 'leftValue']}
          rules={[{ required: true, message: 'Please select a value to compare.' }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            style={{ width: 220 }}
            placeholder={
              valueKey === 'body'
                ? 'Example: items[0].id'
                : 'Example: Content-Type'
            }/>
        </Form.Item>
        <Typography.Paragraph type="secondary">
          {
            valueKey === 'body'
              ? 'Response Body Path'
              : 'Headers Key'
          }
        </Typography.Paragraph>
      </>
    )
  }

  return (
    <Modal
      title="Update Request Assertions"
      visible={visible}
      okText="Update"
      confirmLoading={submitingForm}
      onOk={handleFormSubmit}
      onCancel={onCancel}
      width={800}>

      <Form
        form={form}
        name="assertions-form"
        initialValues={{ assertions }}
        onFieldsChange={() => setFormData(form.getFieldsValue())}
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormFail}
        autoComplete="off"
      >

        <Form.List name="assertions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Row gutter={8} align="middle">
                    <Col>
                      <p style={{ marginBottom: 22 }}>Expect</p>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, 'leftValueKey']}
                        fieldKey={[field.fieldKey, 'leftValueKey']}
                        rules={[{ required: true, message: 'Please select a value to compare.' }]}
                        style={
                          ['body', 'headers'].includes(formData.assertions[field.key]?.leftValueKey)
                            ? { marginBottom: 0 }
                            : {}
                        }
                      >
                        <Select style={{ width: 220 }}>
                          <Select.Option value="body">Response Body</Select.Option>
                          <Select.Option value="headers">Response Headers</Select.Option>
                          <Select.Option value="time">Response Time (ms)</Select.Option>
                          <Select.Option value="statusCode">Status Code</Select.Option>
                        </Select>
                      </Form.Item>
                      {
                        renderSelectorInput({
                          valueKey: formData.assertions[field.key]?.leftValueKey,
                          fieldName: field.name,
                          fieldKey: field.fieldKey
                        })
                      }
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, 'comparator']}
                        fieldKey={[field.fieldKey, 'comparator']}
                        rules={[{ required: true, message: 'Please select a comparator.' }]}
                      >
                        <Select style={{ width: 220 }}>
                          <Select.Option value="=">To equal</Select.Option>
                          <Select.Option value="!=">Not to equal</Select.Option>
                          <Select.Option value=">">To be greater than</Select.Option>
                          <Select.Option value=">=">To be greater or equal than</Select.Option>
                          <Select.Option value="<">To be less than</Select.Option>
                          <Select.Option value="<=">To be less or equal than</Select.Option>
                          <Select.Option value="contains">To contain</Select.Option>
                          <Select.Option value="!contains">Not to contain</Select.Option>
                          <Select.Option value="startsWith">To start with</Select.Option>
                          <Select.Option value="!startsWith">Not to start with</Select.Option>
                          <Select.Option value="endsWith">To end with</Select.Option>
                          <Select.Option value="!endsWith">Not to end with</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, 'rightValue']}
                        fieldKey={[field.fieldKey, 'rightValue']}
                        rules={[{ required: true, message: 'Please select a value to compare.' }]}
                      >
                        <Input style={{ width: 220 }}/>
                      </Form.Item>
                    </Col>
                    <Col>
                      <MinusCircleOutlined onClick={() => remove(field.name)} style={{ marginBottom: 22 }}/>
                    </Col>
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add assertion
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

      </Form>

    </Modal>
  )
}
