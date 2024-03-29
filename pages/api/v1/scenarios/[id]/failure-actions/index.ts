import Amplify from 'aws-amplify'
import { NextApiRequest, NextApiResponse } from 'next'
import striptags from 'striptags'
import awsconfig from '../../../../../../src/aws-exports'
import { FlowoidService } from '../../../../../../src/services/flowoid.service'
import { getQueryParam } from '../../../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../../../src/utils/user.utils'

Amplify.configure({ ...awsconfig, ssr: true })

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

    // Ensure run on failure workflow exists
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
    let actionInputs: Record<string, any>
    switch (req.body.action) {
      case 'httpRequest':
        const httpIntegration = await FlowoidService.getIntegrationByKey('http')
        const httpIntegrationAction = await FlowoidService.getIntegrationActionByKey(httpIntegration.id, 'httpRequest')
        integrationActionId = httpIntegrationAction.id
        actionInputs = req.body.inputs
        break
      case 'SendEmail':
        const emailIntegration = await FlowoidService.getIntegrationByKey('aws-email')
        const emailIntegrationAction = await FlowoidService.getIntegrationActionByKey(emailIntegration.id, 'SendEmail')
        integrationActionId = emailIntegrationAction.id
        actionInputs = {
          Destination: {
            ToAddresses: [req.body.inputs.to]
            // CcAddresses: [],
            // BccAddresses: []
          },
          FromEmailAddress: 'no-reply@flowoid.com',
          // ReplyToAddresses: [],
          Content: {
            Simple: {
              Subject: {
                Charset: 'UTF-8',
                Data: req.body.inputs.subject
              },
              Body: {
                Text: {
                  Charset: 'UTF-8',
                  Data: striptags(req.body.inputs.body)
                },
                Html: {
                  Charset: 'UTF-8',
                  Data: req.body.inputs.body
                }
              }
            }
          }
        }
        break
    }

    await FlowoidService.createWorkflowAction({
      workflowId: runOnFailureWorkflow.id,
      integrationActionId: integrationActionId,
      previousActionId: previousRunOnFailureActions[0]?.id,
      credentials: process.env.FLOWOID_AWS_CREDENTIALS_ID,
      inputs: actionInputs
    })

    res.send({
      failureAction: runOnFailureWorkflow.id
    })
  } catch (e) {
    console.error('ERROR:', e.message)
    res.status(500).send({ error: e.message })
  }
}
