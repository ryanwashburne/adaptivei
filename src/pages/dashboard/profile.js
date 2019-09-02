import React from 'react'

import Profile from './components/_profile'
import Protected from './components/_protected'

export default () => {
  return (
    <Protected>
      {user => <Profile user={user} />}
    </Protected>
  )
}