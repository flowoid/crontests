import { NextApiRequest, NextApiResponse } from 'next'
import { FlowoidService } from '../../../../../../src/services/flowoid.service'
import { getQueryParam } from '../../../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../../../src/utils/user.utils'

export default function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      return listScenarioFailureActions(req, res)
    case 'POST':
      return createScenarioFailureAction(req, res)
  }
}

async function listScenarioFailureActions (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  const workflowId = getQueryParam(req, 'id').toLowerCase()
  try {
    const workflow = await FlowoidService.getWorkflowById(workflowId)
    if (!workflow.runOnFailure) {
      return res.send({ failureActions: [] })
    }
    const runOnFailureWorkflow = await FlowoidService.getWorkflowById(workflow.runOnFailure)
    const failureActions = runOnFailureWorkflow.actions.edges.map(action => FlowoidService.parseActionInputs(action.node))
    res.send({ failureActions })
  } catch (e) {
    console.error('ERROR:', e.message)
    res.status(500).send({ error: e.message })
  }
}

async function createScenarioFailureAction (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  const workflowId = getQueryParam(req, 'id').toLowerCase()
  try {
    const workflow = await FlowoidService.getWorkflowById(workflowId)

    // Ensure run on failure workflow
    let runOnFailureWorkflow: Record<string, any>
    if (workflow.runOnFailure) {
      runOnFailureWorkflow = await FlowoidService.getWorkflowById(workflow.runOnFailure)
    } else {
      const res = await FlowoidService.createWorkflow(workflow.project.id, `__fail__${workflow.id}`)
      await FlowoidService.updateWorkflow(workflowId, { runOnFailure: res.id })
      runOnFailureWorkflow = await FlowoidService.getWorkflowById(res.id)
      console.log('Created run on failure workflow', runOnFailureWorkflow)
    }
    const previousRunOnFailureActions = runOnFailureWorkflow.actions.edges.map(action => action.node)

    let integrationActionId: string
    switch (req.body.action) {
      case 'httpRequest':
        const httpIntegration = await FlowoidService.getIntegrationByKey('http')
        const requestIntegrationAction = await FlowoidService.getIntegrationActionByKey(httpIntegration.id, 'httpRequest')
        integrationActionId = requestIntegrationAction.id
    }

    await FlowoidService.createWorkflowAction({
      workflowId: runOnFailureWorkflow.id,
      integrationActionId: integrationActionId,
      previousActionId: previousRunOnFailureActions[0]?.id,
      inputs: req.body.inputs
    })

    res.send({
      failureAction: runOnFailureWorkflow.id
    })
  } catch (e) {
    console.error('ERROR:', e.message)
    res.status(500).send({ error: e.message })
  }
}
