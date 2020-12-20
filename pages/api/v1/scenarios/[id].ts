import { NextApiRequest, NextApiResponse } from 'next'
import { FlowoidService } from '../../../../src/services/flowoid.service'
import { Scenario } from '../../../../src/typings'
import { getQueryParam } from '../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../src/utils/user.utils'

export default function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      return getScenarioById(req, res)
  }
}

async function getScenarioById (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  try {
    const scenarioId = getQueryParam(req, 'id').toLowerCase()
    const scenario = await fetchScenario(scenarioId, username)
    if (scenario) {
      res.send({ scenario })
    } else {
      res.status(404).send({ error: 'Not Found' })
    }
  } catch (e) {
    console.error('ERROR:', e)
    res.status(500).send({
      error: e.message ?? 'Server Error'
    })
  }
}

async function fetchScenario (scenarioId: string, username: string): Promise<Scenario | null> {
  const workflow = await FlowoidService.getWorkflowById(scenarioId)
  if (workflow && workflow.slug.split('/')[1] === `user_${username}`) {
    delete workflow.slug
    workflow.actions = workflow.actions.edges.map(action => action.node)
    return workflow
  } else {
    return null
  }
}
