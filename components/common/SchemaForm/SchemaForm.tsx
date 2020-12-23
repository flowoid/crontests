import React, { useEffect } from 'react'
import Head from 'next/head'
import { UiSchema, withTheme } from '@rjsf/core'
import { Button } from 'antd'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import get from 'lodash.get'
import cloneDeep from 'lodash.clonedeep'
import { Theme } from '@rjsf/antd'
import { isEmptyObj } from '../../../src/utils/object.utils'
import { jsonSchemaDefinitions } from '../../../src/json-schema/jsonSchemaDefinitions'
import { extractUISchema, fixArraysWithoutItems, removeHiddenProperties } from '../../../src/utils/schema.utils'

const ThemedForm = withTheme(Theme)

type OperationInputs = Record<string, any>

// Needed until this issue is closed https://github.com/react-component/picker/issues/123
dayjs.extend(weekday)
dayjs.extend(localeData)

interface Props {
  schema: any
  initialInputs: OperationInputs
  loading?: boolean
  hideSubmit?: boolean
  onChange?: (data: Record<string, any>) => any
  onSubmit?: (inputs: OperationInputs) => any
  onError?: () => any
  formRef?: (form: HTMLFormElement) => any
}

export const SchemaForm = (props: Props) => {
  const {
    schema,
    initialInputs,
    loading,
    hideSubmit,
    onChange,
    onSubmit,
    onError
  } = props

  // Prepare Json Schema
  let formSchema = cloneDeep(schema) ?? {}

  formSchema.definitions = {
    ...(formSchema.definitions ?? {}),
    ...jsonSchemaDefinitions
  }

  formSchema = removeHiddenProperties(formSchema)
  formSchema = fixArraysWithoutItems(formSchema)

  const formIsEmpty = !formSchema || isEmptyObj(formSchema.properties ?? {})

  // auto-submit empty forms
  useEffect(() => {
    if (formIsEmpty) {
      onSubmit?.({})
    }
  }, [])

  if (formIsEmpty) {
    return <></>
  }

  const uiSchema: UiSchema = extractUISchema(formSchema) ?? {}

  // Sort required properties first
  if (!uiSchema['ui:order'] && formSchema.required) {
    uiSchema['ui:order'] = [...formSchema.required, '*']
  }

  let formData: any

  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          id='theme'
          href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css'
        />
      </Head>
      <ThemedForm
        schema={formSchema}
        uiSchema={uiSchema}
        formData={initialInputs}
        // widgets={{
        //   TextWidget: TextWidgetFactory({ outputs, widgetType: 'text' }),
        //   PasswordWidget: TextWidgetFactory({ outputs, widgetType: 'password' }),
        //   URLWidget: TextWidgetFactory({ outputs, widgetType: 'url' }),
        //   EmailWidget: TextWidgetFactory({ outputs, widgetType: 'email' }),
        //   TextareaWidget: TextWidgetFactory({ outputs, widgetType: 'textarea' }),
        // }}
        onSubmit={(args: any) => onSubmit?.(args.formData)}
        onError={onError?.()}

        onChange={data => {
          onChange?.(data.formData)
          formData = data.formData
        }}

        // Workaround to fix validation. See:
        //   - https://github.com/rjsf-team/react-jsonschema-form/issues/2103
        transformErrors={errors => {
          return errors.filter(error => !isEmptyObj(get(formData, error.property.split('.').slice(1, -1).join('.'))))
        }}
      >
        {
          hideSubmit
            ? <></>
            : <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
        }
      </ThemedForm>
    </>
  )
}
