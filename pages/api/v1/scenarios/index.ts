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
    const integration = await FlowoidService.getIntegrationByKey('http')
    const integrationAction = await FlowoidService.getIntegrationActionByKey(integration.id, 'httpRequest')

    // Ensure project exists
    let project = await FlowoidService.getProjectBySlug(`user_${username}`)
    if (!project) {
      project = await FlowoidService.createProject(`user_${username}`)
    }

    const workflow = await FlowoidService.createWorkflow(project.id, req.body.name)
    await FlowoidService.createWorkflowAction(workflow.id, integrationAction.id, {
      url: req.body.url,
      method: req.body.method
    })

    res.send({
      scenario: {
        id: workflow.id,
        slug: workflow.slug
      }
    })
  } catch (e) {
    console.error('ERROR:', e)
    res.status(500).send({
      error: e.message ?? 'Server Error'
    })
  }
}
