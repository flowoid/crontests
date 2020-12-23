export interface Scenario {
  id: string
  name: string
  state: string | null
  actions?: ScenarioAction[]
  schedule?: any
}

export interface ScenarioAction {
  id: string
  name: string
  inputs: Record<string, any>
  integrationAction: {
    id: string
    key: string
    integration: {
      id: string
      logo: string
    }
  }
}
