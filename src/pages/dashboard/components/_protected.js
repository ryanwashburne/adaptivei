import { navigate } from 'gatsby'

import { isLoggedIn, getUser } from '../../../utils'

export default function(props) {
  if (!isLoggedIn() && typeof window !== 'undefined') {
    navigate('/')
    return null
  }
  const user = getUser()
  return user || typeof window === 'undefined' ? props.children(user) : null
}