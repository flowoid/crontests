import { Avatar, Card, Form, List } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Scenario, ScenarioAction } from '../../src/typings'
import { HttpRequestForm } from '../forms/HttpRequestForm'
import { SendEmailForm } from '../forms/SendEmailForm'

interface BaseProps {
  visible: boolean
  scenario: Scenario
  onCancel: () => void
}
interface AddActionProps {
  onActionAdded: () => void
}

interface EditActionProps {
  scenarioAction: ScenarioAction
  onActionUpdated: (scenarioAction: ScenarioAction) => void
}

type Props = BaseProps & (AddActionProps | EditActionProps)

interface FailureAction {
  key: string
  name: string
  logo: string
  form: JSX.Element
}

export function ScenarioFailureModal (props: Props) {
  const { visible, scenario, onCancel } = props
  const initialScenarioAction = (props as EditActionProps)?.scenarioAction ?? null
  const initialScenarioActionKey = initialScenarioAction?.integrationAction?.key
  const initialInputs = initialScenarioAction?.inputs ?? {}
  const isNewAction = !initialScenarioActionKey

  const [selectedActionKey, setSelectedActionKey] = useState<string | null>(initialScenarioActionKey)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    setSelectedActionKey(initialScenarioActionKey)
  }, [visible])

  const handleFormSubmit = async () => {
    setLoading(true)
    try {
      const inputs = await form.validateFields()
      if (isNewAction) {
        const addActionProps = props as AddActionProps
        await axios.post(`/api/v1/scenarios/${scenario.id}/failure-actions`, {
          inputs,
          action: selectedActionKey
        })
        addActionProps.onActionAdded()
      } else {
        const editActionProps = props as EditActionProps
        await axios.patch(`/api/v1/scenarios/${scenario.id}/failure-actions/${editActionProps.scenarioAction.id}`, {
          ...inputs,
          name: editActionProps.scenarioAction.name
        })
        editActionProps.onActionUpdated({
          ...editActionProps.scenarioAction,
          inputs
        })
      }
    } catch (e) {
      console.error('ERROR:', e)
      // TODO
    } finally {
      setLoading(false)
    }
  }

  const handleActionSelect = (action: FailureAction) => {
    setSelectedActionKey(action.key)
  }

  const ActionsList = () => {
    return (
      <List
        dataSource={actions}
        bordered={false}
        itemLayout="horizontal"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3
        }}
        renderItem={action => {
          const actionContent = (
            <List.Item onClick={() => handleActionSelect?.(action)}>
              <Card hoverable={true} bordered={false} style={{ textAlign: 'center' }}>
                {/* <List.Item.Meta
                  avatar={<Avatar shape="square" size={36} src={action.logo} alt={action.name}/>}
                  title={action.name}
                  description=""
                /> */}
                <div style={{ marginBottom: 16 }}>
                  <Avatar shape="square" size={36} src={action.logo} alt={action.name}/>
                </div>
                <div>
                  <p><strong>{action.name}</strong></p>
                </div>
              </Card>
            </List.Item>
          )
          return actionContent
        }}
        // loadMore={
        //   hasNextPage && (
        //     <div style={{ textAlign: 'center', marginTop: 24 }}>
        //       <Button loading={loadingMore} onClick={handleLoadMoreClick}>Load More</Button>
        //     </div>
        //   )
        // }
      />
    )
  }

  const actions: FailureAction[] = [
    {
      key: 'httpRequest',
      name: 'HTTP Request',
      logo: 'https://flowoid.com/logos/http.svg',
      form: <HttpRequestForm form={form} onSubmit={handleFormSubmit} initialInputs={initialInputs}/>
    },
    {
      key: 'SendEmail',
      name: 'Send Email',
      logo: '/images/email.svg',
      form: <SendEmailForm form={form} onSubmit={handleFormSubmit} initialInputs={initialInputs} scenario={scenario}/>
    }
  ]
  const selectedAction = selectedActionKey
    ? actions.find(action => action.key === selectedActionKey)
    : null

  return (
    <Modal
      title={selectedAction ? selectedAction.name : 'Select action on failure'}
      visible={visible}
      footer={selectedAction ? undefined : null}
      confirmLoading={loading}
      onOk={handleFormSubmit}
      onCancel={onCancel}>
        {
          selectedAction ? selectedAction.form : <ActionsList/>
        }
    </Modal>
  )
}
