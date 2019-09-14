import { getUser } from './auth'

export default async (url, config = {}) => {
  const user = getUser()
  try {
    return await fetch(url, {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': `Bearer ${user.token.access_token}`,
      }
    })
  } catch(e) {
    throw e
  }
}