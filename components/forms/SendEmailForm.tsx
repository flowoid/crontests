import { Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'
import { Scenario } from '../../src/typings'
import { isEmptyObj } from '../../src/utils/object.utils'

interface Props {
  form: FormInstance<any>
  initialInputs?: Record<string, any>
  prependFields?: JSX.Element[]
  scenario: Scenario
  onSubmit: () => void
  onSubmitFailed?: () => void
}

export function SendEmailForm (props: Props) {
  const { form, prependFields, scenario, onSubmit, onSubmitFailed } = props
  let initialInputs = props.initialInputs ?? {}

  // Parse Flowoid inputs
  if (initialInputs.Destination) {
    initialInputs = {
      to: initialInputs.Destination?.ToAddresses?.[0],
      subject: initialInputs.Content?.Simple?.Subject?.Data,
      body: initialInputs.Content?.Simple?.Body?.Html?.Data
    }
  }
  if (isEmptyObj(initialInputs)) {
    initialInputs.subject = `CronTest scenario "${scenario.name}" failed`
    initialInputs.body =
      `Your CronTest test scenario <strong>${scenario.name}</strong> just failed.<br/><br/>\n\n` +
      `Check it here: https://crontests.com/scenario/${scenario.id}`
  }

  return (
    <Form
      form={form}
      name="send-email-form"
      layout="vertical"
      initialValues={initialInputs ?? { method: 'GET' }}
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
    >
      {
        (prependFields ?? [])
      }

      <Form.Item
        label="Send To"
        name="to"
        rules={[{ required: true, message: 'Please input an email recipient.' }]}
      >
        <Input type="email"/>
      </Form.Item>

      <Form.Item
        label="Subject"
        name="subject"
        rules={[{ required: true, message: 'Please input an email subject.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: 'Please input an email body.' }]}
        help="Supports HTML"
      >
        <Input.TextArea autoSize={{ minRows: 4 }}/>
      </Form.Item>
    </Form>
  )
}
