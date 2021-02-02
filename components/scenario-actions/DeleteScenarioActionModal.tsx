import { WarningOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { ScenarioService } from '../../src/services/scenario.service'
import { ScenarioAction } from '../../src/typings'
import { DeleteConfirmationModal } from '../common/Modals/DeleteConfirmationModal'

interface Props {
  visible: boolean
  scenarioId: string
  scenarioAction: ScenarioAction
  onDeleteScenarioAction: (id: string) => any
  onCancel: () => any
}

export function DeleteScenarioActionModal (props: Props) {
  const { scenarioId, scenarioAction, visible, onDeleteScenarioAction, onCancel } = props
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await ScenarioService.deleteFailureAction(scenarioId, scenarioAction.id)
    setLoading(false)
    onDeleteScenarioAction(scenarioAction.id)
  }

  return (
    <DeleteConfirmationModal
      message={
        <>
          Are you sure you want to delete the action <strong>{scenarioAction.name}</strong>?<br/><br/>
          <WarningOutlined /> This action cannot be undone.
        </>
      }
      visible={visible}
      onDelete={handleDelete}
      onCancel={onCancel}
      loading={loading}/>
  )
}
