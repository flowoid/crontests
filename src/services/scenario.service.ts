import fetch from 'isomorphic-unfetch'
import { NextApiRequest } from 'next'
import { Scenario } from '../typings'

export const ScenarioService = {
  async listScenarios (req?: NextApiRequest): Promise<Scenario[]> {
    const res = await fetch('http://localhost:3000/api/v1/scenarios', {
      headers: {
        cookie: req?.headers?.cookie
      }
    })
    if (res.status < 400) {
      return (await res.json())?.scenarios
    }
    throw new Error() // TODO
  },

  async getScenarioById (id: string, req?: NextApiRequest): Promise<Scenario | null> {
    const res = await fetch(`http://localhost:3000/api/v1/scenarios/${id}`, {
      headers: {
        cookie: req?.headers?.cookie
      }
    })
    if (res.status < 400) {
      return (await res.json()).scenario
    }
    if (res.status === 404) {
      return null
    }
    throw new Error() // TODO
  }
}
