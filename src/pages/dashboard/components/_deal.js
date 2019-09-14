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
        <Box my={2} textAlign="center">
          <Button type="submit" color="primary" variant="outlined">Submit</Button>
        </Box>
        <Box>
          <Text variant="caption" color="textSecondary" paragraph>* All deals must be net new opportunities for Adaptive Integration in order to qualify, and must be registered in the Adaptive Portal. Determination of a net new opportunity is at the sole discretion of Adaptive’s sales management team. Criteria for net new opportunities include, but are not limited to the following qualifications: (1) sales representative is the first to attempt registration for the opportunity; (2) deal registration in the portal is complete (no missing information); (3) there is no existing deal registration nor has Adaptive assigned the same opportunity to another sales representative; (4) Adaptive is not already working the opportunity itself. There is no limit to the number of deals registered.</Text>
          <Text variant="caption" color="textSecondary" paragraph>* All deals must be approved by Adaptive’s sales management team. Sales reps can expect to receive an email notifying them of approval or denial of the deal registration.</Text>
          <Text variant="caption" color="textSecondary" paragraph>* Adaptive reserves the right to cancel its rewards program at any time. However, if the rewards program is cancelled, all submitted and valid deal registrations will remain valid for the full 90 days or until a customer Purchase Order is issued. Rewards are issued directly to partner sales representatives.</Text>
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