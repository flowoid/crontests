import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import { Scenario, ScenarioAction } from '../../src/typings'
import { assertionComparators, assertionResponseKeys } from '../../src/data/assertions'

interface Props {
  visible: boolean
  scenario: Scenario
  scenarioAction: ScenarioAction
  onUpdate: (scenarioAction: ScenarioAction) => void
  onCancel: () => void
}

export function ScenarioAssertionsModal (props: Props) {
  const { visible, scenario, scenarioAction, onUpdate, onCancel } = props
  const assertions = scenarioAction.inputs?.assertions ?? []

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
                          {
                            Object.entries(assertionResponseKeys).map(([key, value]) => (
                              <Select.Option value={key}>{value}</Select.Option>
                            ))
                          }
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
                          {
                            Object.entries(assertionComparators).map(([key, value]) => (
                              <Select.Option value={key}>{value}</Select.Option>
                            ))
                          }
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
