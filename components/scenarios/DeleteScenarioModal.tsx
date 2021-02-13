import { WarningOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { ScenarioService } from '../../src/services/scenario.service'
import { Scenario } from '../../src/typings'
import { DeleteConfirmationModal } from '../common/Modals/DeleteConfirmationModal'

interface Props {
  scenario: Scenario
  visible: boolean
  onDeleteScenario: (id: string) => any
  onCancel: () => any
}

export const DeleteScenarioModal = (props: Props) => {
  const { scenario, visible, onDeleteScenario, onCancel } = props
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await ScenarioService.deleteScenario(scenario.id)
    setLoading(false)
    onDeleteScenario(scenario.id)
  }

  return (
    <DeleteConfirmationModal
      message={
        <>
          Are you sure you want to delete the scenario <strong>{scenario.name}</strong>?<br/><br/>
          <WarningOutlined /> This action cannot be undone.
        </>
      }
      visible={visible}
      onDelete={handleDelete}
      onCancel={onCancel}
      loading={loading}/>
  )
}
