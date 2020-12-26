import { NextApiRequest, NextApiResponse } from 'next'
import { FlowoidService } from '../../../../../src/services/flowoid.service'
import { getQueryParam } from '../../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../../src/utils/user.utils'

export default function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      return listScenarioRuns(req, res)
  }
}

async function listScenarioRuns (req: NextApiRequest, res: NextApiResponse) {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  try {
    const scenarioId = getQueryParam(req, 'id').toLowerCase()
    const workflowRuns = await FlowoidService.listWorkflowRuns(scenarioId)
    res.send({ runs: workflowRuns })
  } catch (e) {
    console.error('ERROR:', e)
    res.status(500).send({
      error: e.message ?? 'Server Error'
    })
  }
}
