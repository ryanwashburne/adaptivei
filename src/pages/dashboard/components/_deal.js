import React from 'react'

import { Text, TextField, Box, Button, Snackbar } from '../../../components'
import { NetlifyForm } from '../../../utils'

export default () => {
  const [state, changeState] = React.useState({})
  const [success, changeSuccess] = React.useState()

  function handleChange(e) {
    changeState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    changeSuccess(true)
  }

  function handleClose() {
    changeSuccess(false)
  }

  return (
    <>
      <Text paragraph variant="subtitle1">Complete this form to submit for a new deal registration</Text>
      <NetlifyForm
        name="deal-registration"
        action="/dashboard/"
        onSubmit={handleSubmit}
        fields={state}
      >
        <TextField
          name="first-name"
          label="First Name"
          required
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="last-name"
          label="Last Name"
          required
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="company"
          label="Company"
          required
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="phone-number"
          label="Phone Number"
          required
          onChange={handleChange}
          fullWidth
          type="number"
        />
        <TextField
          name="customer-name"
          label="Customer Name"
          required
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="project-details"
          label="Project Details"
          required
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          rowsMax={6}
        />
        <Box mt={2} textAlign="center">
          <Button type="submit" color="primary" variant="outlined">Submit</Button>
        </Box>
      </NetlifyForm>
      <Snackbar
        open={success}
        onClose={handleClose}
        variant="success"
        message="Form successfully submitted"
      />
    </>
  )
}