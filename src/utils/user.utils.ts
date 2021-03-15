import { withSSRContext } from 'aws-amplify'
import { NextApiRequest } from 'next'

export async function getAuthUsername (req: NextApiRequest): Promise<string | undefined> {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user.username
  } catch (e) {}
}
