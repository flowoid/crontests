import Amplify from 'aws-amplify'
import { NextApiRequest, NextApiResponse } from 'next'
import awsconfig from '../../../../../../src/aws-exports'
import { FlowoidService } from '../../../../../../src/services/flowoid.service'
import { getQueryParam } from '../../../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../../../src/utils/user.utils'

Amplify.configure({ ...awsconfig, ssr: true })

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
  const workflowId = getQueryParam(req, 'id').toLowerCase()
  const scenarioActionId = getQueryParam(req, 'actionId').toLowerCase()
  if (req.body.assertions) {
    req.body.assertions = await prepareAssertionInputs(workflowId, req.body.assertions)
  }
  await FlowoidService.updateWorkflowAction(scenarioActionId, req.body.name, req.body)
  res.send({
    scenarioAction: {
      id: scenarioActionId
    }
  })
}

async function prepareAssertionInputs (workflowId: string, assertions: any[]): Promise<any[]> {
  const workflow = await FlowoidService.getWorkflowById(workflowId)
  const firstActionId = workflow.actions.edges[0].node.id
  return assertions.map(assertion => {
    let leftValue: string
    if (assertion.leftValueKey === 'statusCode') {
      leftValue = 'status'
    } else if (assertion.leftValueKey === 'time') {
      leftValue = 'time'
    } else if (assertion.leftValueKey === 'headers') {
      leftValue = `headers.${assertion.leftValue}`
    } else if (assertion.leftValueKey === 'body') {
      leftValue = `data.${assertion.leftValue}`
    }
    return {
      leftValue: `{{${firstActionId}.${leftValue}}}`,
      comparator: assertion.comparator,
      rightValue: assertion.rightValue
    }
  })
}
