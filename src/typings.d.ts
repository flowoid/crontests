export interface Scenario {
  id: string
  name: string
  state: string | null
  actions?: ScenarioAction[]
}

export interface ScenarioAction {
  id: string
  name: string
}
