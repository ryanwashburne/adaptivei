import React from 'react'

import Main from './components/_main'
import Protected from './components/_protected'

export default () => (
  <Protected>
    {user => <Main user={user} />}
  </Protected>
)