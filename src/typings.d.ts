export interface Scenario {
  id: string
  name: string
  state: string | null
  enabled: boolean
  actions?: ScenarioAction[]
  schedule?: ScenarioSchedule
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

interface BaseScenarioSchedule {
  id: string
}

interface ScenarioScheduleOnce {
  frequency: 'once'
  datetime: Date
}

interface ScenarioScheduleInterval {
  frequency: 'interval'
  interval: number
}

interface ScenarioScheduleHour {
  frequency: 'hour'
  minute: number
}

interface ScenarioScheduleDay {
  frequency: 'day'
  time: string
}

interface ScenarioScheduleWeek {
  frequency: 'week'
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  time: string
}

interface ScenarioScheduleMonth {
  frequency: 'month'
  dayOfMonth: number
  time: string
}

interface ScenarioScheduleCron {
  frequency: 'cron'
  expression: string
}

export type ScenarioSchedule =
  BaseScenarioSchedule & (
    ScenarioScheduleOnce |
    ScenarioScheduleInterval |
    ScenarioScheduleHour |
    ScenarioScheduleDay |
    ScenarioScheduleWeek |
    ScenarioScheduleMonth |
    ScenarioScheduleCron
  )
