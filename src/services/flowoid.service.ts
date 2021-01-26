import { gql, GraphQLClient } from 'graphql-request'
import { ScenarioSchedule } from '../typings'

export const FlowoidService = {
  async listIntegrations (filter: Record<string, any>) {
    const query = gql`
      query ($filter: IntegrationFilter) {
        integrations (filter: $filter) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, { filter })
    return res.integrations.edges.map(edge => edge.node)
  },

  async getIntegrationByKey (key: string) {
    const integrations = await FlowoidService.listIntegrations({ key: { eq: key } })
    if (integrations.length === 1) {
      return integrations[0]
    }
    return null
  },

  async listIntegrationTriggers (filter: Record<string, any>) {
    const query = gql`
      query ($filter: IntegrationTriggerFilter) {
        integrationTriggers (filter: $filter) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, { filter })
    return res.integrationTriggers.edges.map(edge => edge.node)
  },

  async getIntegrationTriggersByKey (integrationId: string, key: string) {
    const integrationTriggers = await FlowoidService.listIntegrationTriggers({
      integration: { eq: integrationId },
      key: { eq: key }
    })
    if (integrationTriggers.length === 1) {
      return integrationTriggers[0]
    }
    return null
  },

  async listIntegrationActions (filter: Record<string, any>) {
    const query = gql`
      query ($filter: IntegrationActionFilter) {
        integrationActions (filter: $filter) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, { filter })
    return res.integrationActions.edges.map(edge => edge.node)
  },

  async getIntegrationActionByKey (integrationId: string, key: string) {
    const integrationActions = await FlowoidService.listIntegrationActions({
      integration: { eq: integrationId },
      key: { eq: key }
    })
    if (integrationActions.length === 1) {
      return integrationActions[0]
    }
    return null
  },

  async listProjects (filter: Record<string, any> = {}) {
    const query = gql`
      query ($filter: ProjectFilter) {
        projects (filter: $filter) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, { filter })
    return res.projects.edges.map(edge => edge.node)
  },

  async getProjectBySlug (slug: string) {
    const projects = await FlowoidService.listProjects({ slug: { eq: `${process.env.FLOWOID_USERNAME}/${slug}` } })
    if (projects.length === 1) {
      return projects[0]
    }
    return null
  },

  async createProject (name: string) {
    const mutation = gql`
      mutation ($input: CreateOneProjectInput!) {
        createOneProject (input: $input) {
          id
          slug
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        project: {
          name,
          public: false
        }
      }
    })
    return res.createOneProject
  },

  async listWorkflows (projectId: string) {
    const query = gql`
      query ($filter: WorkflowFilter) {
        workflows (filter: $filter) {
          edges {
            node {
              id
              name
              state
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, {
      filter: {
        project: {
          eq: projectId
        }
      }
    })
    return res.workflows.edges.map(edge => edge.node)
  },

  async getWorkflowById (id: string) {
    const query = gql`
      query ($id: ID!) {
        workflow (id: $id) {
          id
          slug
          name
          state
          runOnFailure
          project {
            id
          }
          trigger {
            id
            enabled
            schedule
          }
          actions {
            edges {
              node {
                id
                name
                inputs
                integrationAction {
                  id
                  key
                  integration {
                    id
                    logo
                  }
                }
              }
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, { id })
    return res.workflow
  },

  async createWorkflow (projectId: string, name: string) {
    const mutation = gql`
      mutation ($input: CreateOneWorkflowInput!) {
        createOneWorkflow (input: $input) {
          id
          name
          state
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        workflow: {
          project: projectId,
          name
        }
      }
    })
    return res.createOneWorkflow
  },

  async updateWorkflow (workflowId: string, update: { name?: string, runOnFailure?: string }) {
    const mutation = gql`
      mutation ($input: UpdateOneWorkflowInput!) {
        updateOneWorkflow (input: $input) {
          id
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        id: workflowId,
        update
      }
    })
    return res.updateOneWorkflow
  },

  async createWorkflowTrigger (
    workflowId: string,
    integrationTriggerId: string,
    schedule: ScenarioSchedule,
    inputs: Record<string, any> = {}
  ) {
    const mutation = gql`
      mutation ($input: CreateOneWorkflowTriggerInput!) {
        createOneWorkflowTrigger (input: $input) {
          id
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        workflowTrigger: {
          workflow: workflowId,
          integrationTrigger: integrationTriggerId,
          schedule,
          inputs
        }
      }
    })
    return res.createOneWorkflowTrigger
  },

  async updateWorkflowTrigger (
    workflowTriggerId: string,
    update: {
      schedule?: ScenarioSchedule
      inputs?: Record<string, any>
      enabled?: Boolean
    }
  ) {
    const mutation = gql`
      mutation ($input: UpdateOneWorkflowTriggerInput!) {
        updateOneWorkflowTrigger (input: $input) {
          id
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        id: workflowTriggerId,
        update
      }
    })
    return res.updateOneWorkflowTrigger
  },

  async createWorkflowAction (options: {
    workflowId: string
    integrationActionId: string
    previousActionId?: string
    inputs: Record<string, any>
  }) {
    const mutation = gql`
      mutation ($input: CreateOneWorkflowActionInput!) {
        createOneWorkflowAction (input: $input) {
          id
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        workflowAction: {
          workflow: options.workflowId,
          integrationAction: options.integrationActionId,
          previousAction: options.previousActionId,
          inputs: options.inputs
        }
      }
    })
    return res.createOneWorkflowAction
  },

  async updateWorkflowAction (
    workflowActionId: string,
    name: string,
    inputs: Record<string, any>
  ) {
    const mutation = gql`
      mutation ($input: UpdateOneWorkflowActionInput!) {
        updateOneWorkflowAction (input: $input) {
          id
        }
      }
    `
    const res = await FlowoidService.requestQuery(mutation, {
      input: {
        id: workflowActionId,
        update: {
          name,
          inputs
        }
      }
    })
    return res.updateOneWorkflowAction
  },

  async listWorkflowRuns (workflowId: string) {
    const query = gql`
      query ($filter: WorkflowRunFilter, $sorting: [WorkflowRunSort!]) {
        workflowRuns (filter: $filter, sorting: $sorting) {
          edges {
            node {
              id
              status
              createdAt
            }
          }
        }
      }
    `
    const res = await FlowoidService.requestQuery(query, {
      filter: {
        workflow: {
          eq: workflowId
        }
      },
      sorting: [{
        field: 'createdAt',
        direction: 'DESC'
      }]
    })
    return res.workflowRuns.edges.map(edge => edge.node)
  },

  async requestQuery (query: string, variables: Record<string, any>) {
    const client = new GraphQLClient(process.env.FLOWOID_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${process.env.FLOWOID_API_KEY}`
      }
    })
    return await client.request(query, variables)
  }
}
