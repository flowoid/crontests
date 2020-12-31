import { NextApiRequest, NextApiResponse } from 'next'
import { FlowoidService } from '../../../../../../src/services/flowoid.service'
import { getQueryParam } from '../../../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../../../src/utils/user.utils'

export default function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'PATCH':
      return updateScenarioAction(req, res)
  }
}

async function updateScenarioAction (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  const scenarioActionId = getQueryParam(req, 'actionId').toLowerCase()
  await FlowoidService.updateWorkflowAction(scenarioActionId, req.body.name, req.body)
  res.send({
    scenarioAction: {
      id: scenarioActionId
    }
  })
}
