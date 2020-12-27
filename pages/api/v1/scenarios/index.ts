import { NextApiRequest, NextApiResponse } from 'next'
import { FlowoidService } from '../../../../src/services/flowoid.service'
import { getAuthUsername } from '../../../../src/utils/user.utils'

export default function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      return listScenarios(req, res)
    case 'POST':
      return createScenario(req, res)
  }
}

async function listScenarios (req: NextApiRequest, res: NextApiResponse) {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  try {
    const project = await FlowoidService.getProjectBySlug(`user_${username}`)
    if (project) {
      const workflows = await FlowoidService.listWorkflows(project.id)
      res.json({ scenarios: workflows })
    } else {
      res.json({ scenarios: [] })
    }
  } catch (e) {
    console.error('ERROR:', e)
    res.status(500).send({
      error: e.message ?? 'Server Error'
    })
  }
}

async function createScenario (req: NextApiRequest, res: NextApiResponse) {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  try {
    const httpIntegration = await FlowoidService.getIntegrationByKey('http')
    const requestIntegrationAction = await FlowoidService.getIntegrationActionByKey(httpIntegration.id, 'httpRequest')
    const logicIntegration = await FlowoidService.getIntegrationByKey('logic')
    const assertionsIntegrationAction = await FlowoidService.getIntegrationActionByKey(logicIntegration.id, 'assertions')

    // Ensure project exists
    let project = await FlowoidService.getProjectBySlug(`user_${username}`)
    if (!project) {
      project = await FlowoidService.createProject(`user_${username}`)
    }

    const workflow = await FlowoidService.createWorkflow(project.id, req.body.name)

    // Add request action
    const requestWorkflowAction = await FlowoidService.createWorkflowAction({
      workflowId: workflow.id,
      integrationActionId: requestIntegrationAction.id,
      inputs: {
        url: req.body.url,
        method: req.body.method
      }
    })

    // Add assertions action
    await FlowoidService.createWorkflowAction({
      workflowId: workflow.id,
      integrationActionId: assertionsIntegrationAction.id,
      previousActionId: requestWorkflowAction.id,
      inputs: {
        assertions: [{
          leftValue: `{{${requestWorkflowAction.id}.status}}`,
          comparator: '<',
          rightValue: '400'
        }]
      }
    })

    res.send({
      scenario: workflow
    })
  } catch (e) {
    console.error('ERROR:', e)
    res.status(500).send({
      error: e.message ?? 'Server Error'
    })
  }
}
