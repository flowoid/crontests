import { Avatar, Card, Form, List } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Scenario } from '../../src/typings'
import { HttpRequestForm } from '../forms/HttpRequestForm'

interface Props {
  visible: boolean
  scenario: Scenario
  onActionAdded: () => void
  onCancel: () => void
}

interface FailureAction {
  id: string
  name: string
  logo: string
  form: JSX.Element
}

export function ScenarioFailureModal (props: Props) {
  const { visible, scenario, onActionAdded, onCancel } = props
  const [selectedAction, setSelectedAction] = useState<FailureAction | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    setSelectedAction(null)
  }, [visible])

  const handleFormSubmit = async () => {
    setLoading(true)
    try {
      const inputs = await form.validateFields()
      await axios.post(`/api/v1/scenarios/${scenario.id}/failure-actions`, {
        inputs,
        action: selectedAction.id
      })
      onActionAdded()
    } catch (e) {
      console.error('ERROR:', e)
      // TODO
    } finally {
      setLoading(false)
    }
  }

  const handleActionSelect = (action: FailureAction) => {
    setSelectedAction(action)
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
      id: 'httpRequest',
      name: 'HTTP Request',
      logo: 'https://flowoid.com/logos/http.svg',
      form: <HttpRequestForm form={form} onSubmit={handleFormSubmit}/>
    }
  ]

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
