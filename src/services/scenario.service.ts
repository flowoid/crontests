import axios from 'axios'
import { NextApiRequest } from 'next'
import { Scenario, ScenarioAction, ScenarioRun } from '../typings'

export const ScenarioService = {
  async listScenarios (req?: NextApiRequest): Promise<Scenario[]> {
    const res = await axios.get('http://localhost:3000/api/v1/scenarios', {
      headers: {
        cookie: req?.headers?.cookie
      }
    })
    if (res.status < 400) {
      return res.data.scenarios
    }
    throw new Error() // TODO
  },

  async getScenarioById (id: string, req?: NextApiRequest): Promise<Scenario | null> {
    const res = await axios.get(`http://localhost:3000/api/v1/scenarios/${id}`, {
      headers: {
        cookie: req?.headers?.cookie
      }
    })
    if (res.status < 400) {
      return res.data.scenario
    }
    if (res.status === 404) {
      return null
    }
    throw new Error() // TODO
  },

  async patchScenario (id: string, data: Partial<Scenario>, req?: NextApiRequest): Promise<{ id: Scenario['id'] } | null> {
    const res = await axios.patch(`http://localhost:3000/api/v1/scenarios/${id}`, {
      method: 'PATCH',
      headers: {
        cookie: req?.headers?.cookie
      },
      data
    })
    if (res.status < 400) {
      return res.data.scenario
    }
    if (res.status === 404) {
      return null
    }
    throw new Error() // TODO
  },

  async listScenarioRuns (id: string, req?: NextApiRequest): Promise<ScenarioRun[]> {
    const res = await axios.get(`http://localhost:3000/api/v1/scenarios/${id}/runs`, {
      headers: {
        cookie: req?.headers?.cookie
      }
    })
    if (res.status < 400) {
      return res.data.runs
    }
    throw new Error() // TODO
  },

  async listFailureActions (scenarioId: string, req?: NextApiRequest): Promise<ScenarioAction[]> {
    const res = await axios.get(`http://localhost:3000/api/v1/scenarios/${scenarioId}/failure-actions`, {
      headers: {
        cookie: req?.headers?.cookie
      }
    })
    if (res.status < 400) {
      return res.data.failureActions
    }
    throw new Error() // TODO
  }

}
