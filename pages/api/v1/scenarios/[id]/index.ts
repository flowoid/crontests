import Amplify from 'aws-amplify'
import { NextApiRequest, NextApiResponse } from 'next'
import awsconfig from '../../../../../src/aws-exports'
import { FlowoidService } from '../../../../../src/services/flowoid.service'
import { Scenario } from '../../../../../src/typings'
import { getQueryParam } from '../../../../../src/utils/next.utils'
import { getAuthUsername } from '../../../../../src/utils/user.utils'

Amplify.configure({ ...awsconfig, ssr: true })

export default function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      return getScenarioById(req, res)
    case 'PATCH':
      return updateScenario(req, res)
    case 'DELETE':
      return deleteScenario(req, res)
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

async function updateScenario (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  const scenarioId = getQueryParam(req, 'id').toLowerCase()
  const scenario = await fetchScenario(scenarioId, username)
  const data: Partial<Scenario> = req.body.data

  if (data.name) {
    await FlowoidService.updateWorkflow(scenarioId, { name: data.name })
  }

  if (data.schedule) {
    if (!scenario.schedule) {
      const scheduleIntegration = await FlowoidService.getIntegrationByKey('schedule')
      const scheduleTrigger = await FlowoidService.getIntegrationTriggersByKey(scheduleIntegration.id, 'schedule')
      await FlowoidService.createWorkflowTrigger(scenario.id, scheduleTrigger.id, data.schedule)
    } else {
      await FlowoidService.updateWorkflowTrigger(scenario.schedule.id, { schedule: data.schedule })
    }
  }

  if (data.enabled !== undefined) {
    await FlowoidService.updateWorkflowTrigger(scenario.schedule.id, { enabled: data.enabled })
  }

  res.send({
    scenario: {
      id: scenario.id
    }
  })
}

async function deleteScenario (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const username = await getAuthUsername(req)
  if (!username) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  try {
    const scenarioId = getQueryParam(req, 'id').toLowerCase()
    await FlowoidService.deleteWorkflow(scenarioId)
    res.send({})
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
    const scenario: Scenario = {
      id: workflow.id,
      name: workflow.name,
      state: workflow.state,
      enabled: workflow.trigger?.enabled ?? false,
      actions: workflow.actions.edges.map(action => FlowoidService.parseActionInputs(action.node)),
      schedule: workflow.trigger
        ? {
          id: workflow.trigger.id,
          ...(workflow.trigger.schedule ?? {})
        }
        : null
    }
    return scenario
  } else {
    return null
  }
}
