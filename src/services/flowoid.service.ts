import { gql, GraphQLClient } from 'graphql-request'

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
              slug
              state
            }
          }
        }
      }
    `
    return await FlowoidService.requestQuery(query, {
      filter: {
        project: projectId
      }
    })
  },

  async createWorkflow (projectId: string, name: string) {
    const mutation = gql`
      mutation ($input: CreateOneWorkflowInput!) {
        createOneWorkflow (input: $input) {
          id
          slug
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

  async createWorkflowAction (workflowId: string, integrationActionId: string, inputs: Record<string, any>) {
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
          workflow: workflowId,
          integrationAction: integrationActionId,
          inputs
        }
      }
    })
    return res.createOneWorkflowAction
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
