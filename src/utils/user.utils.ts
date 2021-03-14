import { withSSRContext } from 'aws-amplify'
import { NextApiRequest } from 'next'

export async function getAuthUsername (req: NextApiRequest): Promise<string | undefined> {
  console.log('=== getAuthUsername ===')
  const { Auth } = withSSRContext({ req })
  console.log('Auth =>', Auth)
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log('User =>', user)
    return user.username
  } catch (e) {
    console.log('Error =>', e)
  }
}
