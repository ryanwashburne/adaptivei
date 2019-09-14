import React from 'react'

import { Box, Text, Button } from '../../../components'
import { authFetch } from '../../../utils'

export default ({ user }) => {
  const [deals, changeDeals] = React.useState()
  React.useEffect(() => {
    fetchDeals()
  }, [])

  async function fetchDeals() {
    try {
      const res = await authFetch('/.netlify/functions/load-deals')
      changeDeals(await res.json())
    } catch(e) {
      console.error(e)
      return []
    }
  }

  async function handleApprove(data) {
    try {
      await authFetch('/.netlify/functions/sendgrid', {
        method: 'POST',
        body: JSON.stringify({
          name: `${data['first-name']} ${data['last-name']}`,
          customer: data.company,
          email: data.email,
          id: data.id,
        }),
      })
      alert('Ok')
    } catch(e) {
      console.error(e)
    }
  }

  async function handleDeny(id) {
    const confirmation = window.confirm('Are you sure you want to deny?')
    if (confirmation) {
      try {
        await fetch('/.netlify/functions/delete-deal', {
          method: 'POST',
          body: JSON.stringify({
            submissionId: id
          }),
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        })
      } catch(e) {
        console.error(e)
      }
    }
  }

  if (!deals) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      {deals.length === 0 && <Text>No pending deals</Text>}
      {deals.map(({ data, id }, i) => {
        return (
          <Box key={i} my={3}>
            <Text>{data['first-name']} {data['last-name']}</Text>
            <Text>{data.company}</Text>
            <Text>{data.email}</Text>
            <Text>{data['phone-number']}</Text>
            <Text>{data['customer-name']}</Text>
            <Text>{data['project-details']}</Text>
            <Button onClick={() => handleApprove({...data, id})} color="primary" variant="outlined">APPROVE</Button>
            <Button onClick={() => handleDeny(id)}>DENY</Button>
          </Box>
        )
      })}
    </>
  )
}