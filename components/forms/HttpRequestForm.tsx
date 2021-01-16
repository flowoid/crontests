import { Collapse, Form, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'
import { SchemaForm } from '../common/SchemaForm/SchemaForm'

interface Props {
  form: FormInstance<any>
  initialInputs?: Record<string, any>
  prependFields?: JSX.Element[]
  onSubmit: () => void
  onSubmitFailed?: () => void
  onAdvanceOptionsChange?: (data: Record<string, any>) => void
}

export function HttpRequestForm (props: Props) {
  const { form, initialInputs, prependFields, onSubmit, onSubmitFailed, onAdvanceOptionsChange } = props
  const advancedInitialInputs = { ...initialInputs }
  delete advancedInitialInputs.name
  delete advancedInitialInputs.url
  delete advancedInitialInputs.method

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
    <Form
      form={form}
      name="http-request-form"
      layout="vertical"
      initialValues={initialInputs ?? { method: 'GET' }}
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
    >
      {
        (prependFields ?? [])
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
            onChange={onAdvanceOptionsChange}
            initialInputs={advancedInitialInputs ?? {}}/>
        </Collapse.Panel>
      </Collapse>
    </Form>
  )
}
